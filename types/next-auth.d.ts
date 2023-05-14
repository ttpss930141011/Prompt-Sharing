import NextAuth, { DefaultSession,Profile } from "next-auth";
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string | null;
        } & DefaultSession["user"];
    }
    interface Profile extends Profile{
        picture: string | undefined;
    }
}
