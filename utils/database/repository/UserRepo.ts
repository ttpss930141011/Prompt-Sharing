import User, { UsersModel } from "@/utils/database/models/users";

export default class UserRepo {
    // contains critical information of the user
    static findAll(): Promise<User[] | null> {
        return UsersModel.find({ status: true }).lean().exec();
    }

    static findByEmail(email: string): Promise<User | null> {
        return UsersModel.findOne({ email, status: true }).lean().exec();
    }

    static findByUsername(username: string): Promise<User | null> {
        return UsersModel.findOne({ username, status: true }).lean().exec();
    }

    static async create(user: User): Promise<User> {
        const createdUser = await UsersModel.create(user);
        return createdUser.toObject();
    }

    static async update(user: User): Promise<User> {
        await UsersModel.updateOne({ _id: user._id }, { $set: { ...user } })
            .lean()
            .exec();
        return user;
    }
}
