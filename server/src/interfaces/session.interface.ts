import { Types } from "mongoose";

export default interface Session {
    _id: Types.ObjectId;
    sessionId: string;
    valid: boolean;
}