"use client";
import React, { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type Props = {
    children: React.ReactNode;
    session?: Session | null;
};
const Provider: FC<Props> = ({ children, session }) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
