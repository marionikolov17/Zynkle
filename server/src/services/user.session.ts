import Session from "./../interfaces/session.interface";
import { Types } from "mongoose";

export const sessions: Record<string, Session> = {};

export function getSession(sessionId: string) {
    const session = sessions[sessionId];

    return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string) {
    const session = sessions[sessionId];
  
    if (session) {
      sessions[sessionId].valid = false;
    }
  
    return sessions[sessionId];
}
  
export function createSession(_id: Types.ObjectId) {
    const sessionId = String(Object.keys(sessions).length + 1);
  
    const session = { sessionId, _id, valid: true };
  
    sessions[sessionId] = session;
  
    return session;
}