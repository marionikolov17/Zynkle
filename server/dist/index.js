"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseApp = void 0;
require("dotenv/config");
const app_1 = require("firebase/app");
const firebase_config_1 = require("./config/firebase.config");
// Initialize Firebase
exports.firebaseApp = (0, app_1.initializeApp)(firebase_config_1.firebaseConfig);
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const express_config_1 = __importDefault(require("./config/express.config"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', "true");
    // Pass to next layer of middleware
    next();
});
(0, express_config_1.default)(app);
app.use(auth_middleware_1.checkAccessToken, auth_middleware_1.checkRefreshToken);
app.use("/api/v1", routes_1.default);
app.use(error_middleware_1.errorHandler);
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.NODE_ENV == "development"
    ? `mongodb://localhost:27017/`
    : `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qgebwbo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose_1.default
    .connect(DB_URL, { dbName: process.env.DB_NAME })
    .then(() => {
    console.log("DB Connected successfully!");
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=index.js.map