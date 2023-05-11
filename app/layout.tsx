import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/globals.css";
import React, { FC } from "react";

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
};

type Props = {
    children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider session={null}>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
