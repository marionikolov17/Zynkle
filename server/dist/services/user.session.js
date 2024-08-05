"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessions = void 0;
exports.getSession = getSession;
exports.invalidateSession = invalidateSession;
exports.createSession = createSession;
exports.sessions = {};
function getSession(sessionId) {
    const session = exports.sessions[sessionId];
    return session && session.valid ? session : null;
}
function invalidateSession(sessionId) {
    const session = exports.sessions[sessionId];
    if (session) {
        exports.sessions[sessionId].valid = false;
    }
    return exports.sessions[sessionId];
}
function createSession(_id) {
    const sessionId = String(Object.keys(exports.sessions).length + 1);
    const session = { sessionId, _id, valid: true };
    exports.sessions[sessionId] = session;
    return session;
}
//# sourceMappingURL=user.session.js.map