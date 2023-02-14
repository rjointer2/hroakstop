

import mongoose, { model, Schema } from "mongoose";

export interface RequestSchema {
    createdByWho: string,
    isPending: boolean
    department: string
    timeoff: string
    id: string
}

export const requestSchema = new Schema<RequestSchema>({
    createdByWho: {
        type: String,
        required: true,
    },
    isPending: {
        type: Boolean,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    timeoff: {
        type: String,
        required: true,
    },
}, { timestamps: true, minimize: false, },);

export const RequestModel = mongoose.models.Request || model('Request', requestSchema)