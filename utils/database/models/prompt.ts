import { Model, model, models, Schema, Types } from "mongoose";
const DOCUMENT_NAME = "Prompt";
const COLLECTION_NAME = "prompts";

export default interface Prompt {
    creator: Types.ObjectId;
    prompt: string;
    tag: string;
    status?: boolean;
}

const PromptSchema = new Schema<Prompt>(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        prompt: {
            type: String,
            required: [true, "Prompt is required."],
        },
        tag: {
            type: String,
            required: [true, "Tag is required."],
        },
        status: {
            type: Schema.Types.Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);
export const PromptsModel: Model<Prompt> =
    models[DOCUMENT_NAME] || model(DOCUMENT_NAME, PromptSchema, COLLECTION_NAME);
