# How to setup and run the front-end

1. Open a new terminal and type the following commands
```
cd client
npm install
```
2. Open <mark>'client/src/shared/services/rest-api.service.js'</mark> and change this line to this
```
// client/src/shared/services/rest-api.service.js
const BASE_URL = "http://localhost:3000/api/v1/";
```
> [!TIP]
> It is optional, if you want to use your own database and server, otherwise the deployed server will be used.
3. Type the following command in the terminal
```
npm run dev
```