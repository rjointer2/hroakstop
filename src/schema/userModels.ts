

import mongoose, { model, Schema } from "mongoose";

export interface UserSchema {
    ssn: string
    email: string
    admin: boolean
    department: string
    approver: boolean
    fullname: string
    timeoff: string
    classification: boolean
}

export const userSchema = new Schema<UserSchema>({
    ssn: {
        type: String,
        required: true,
        unique: false,
    },
    timeoff: {
        type: String,
        required: true,
        unique: false,
    },
    classification: {
        type: Boolean,
        required: true,
        unique: false,
    },
    fullname: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, 'Must match an email address!'],
        required: true,
        unique: false,
    },
    department: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    approver: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true, minimize: false },);

export const UserModel = mongoose.models.Users || model('Users', userSchema)