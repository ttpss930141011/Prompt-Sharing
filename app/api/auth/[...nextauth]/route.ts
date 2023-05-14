import { GOOGLE_CLIENT_SECRET, GOOGLE_ID } from "@/config";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import UserRepo from "@/utils/database/repository/UserRepo";
// import User from "@/utils/database/models/users";
import { Types } from "mongoose";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const { user } = session;
            if (!user) return session;
            const { email } = user;
            if (!email) throw new Error("Email not found");
            const sessionUser = await UserRepo.findByEmail(email);
            if (sessionUser) session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();
                if (!profile) throw new Error("No profile found");
                const { email, name, image } = profile;
                if (!email || !name || !image) throw new Error("Parial profile not found");
                const userExists = await UserRepo.findByEmail(email);
                if (!userExists) {
                    const newUser = {
                        _id: new Types.ObjectId(),
                        email,
                        image,
                        username: name.replace(/\s+/g, ""),
                    };
                    await UserRepo.create(newUser);
                }
                return true;
            } catch (error: unknown) {
                if (!(error instanceof Error)) throw error;
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
