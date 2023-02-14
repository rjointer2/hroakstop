
import mongoose, { model, Schema } from "mongoose";

export interface SessionSchema {
    email: string
}

export const sessionSchema = new Schema<SessionSchema>({
    email: {
        type: String,
        match: [/.+@.+\..+/, 'Must match an email address!'],
        required: true,
        unique: true,
    },
}, { timestamps: true, minimize: false, "expires": '0s', },);

export const SessionModel = mongoose.models.Session || model('Session', sessionSchema)