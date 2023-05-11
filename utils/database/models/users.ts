import { Model, model, models, Schema, Types } from "mongoose";
const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "users";

export default interface User {
    _id: Types.ObjectId;
    email: string;
    username?: string;
    status?: boolean;
    image?: string;
}

const UserSchema = new Schema<User>(
    {
        email: {
            type: Schema.Types.String,
            unique: true,
            require: [true, "Email is required"],
        },
        username: {
            type: Schema.Types.String,
            required: [true, "Username is required"],
        },
        image: {
            type: Schema.Types.String,
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
export const UsersModel: Model<User> =
    models.UsersModel || model(DOCUMENT_NAME, UserSchema, COLLECTION_NAME);
