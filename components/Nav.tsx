"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    signIn,
    signOut,
    useSession,
    getProviders,
    LiteralUnion,
    ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

const Nav = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null>(null);

    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href={"/"} className="flex gap-2 flex-center">
                <Image
                    src={"/assets/images/logo.svg"}
                    alt="Promptopia Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                ></Image>
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* Desktop Naviation */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href={"/create-prompt"} className="black_btn">
                            Create Prompt
                        </Link>
                        <button className="outline_btn" type="button" onClick={() => signOut()}>
                            Sign Out
                        </button>
                        <Link href={"/profile"}>
                            <Image
                                src={"/assets/images/logo.svg"}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                            ></Image>
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                ></button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile navigation */}
            <div className="sm:hidden flex relative">
                {isUserLoggedIn ? (
                    <div className="flex">
                        <Image
                            src={"/assets/images/logo.svg"}
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropdown((prep) => !prep)}
                        ></Image>
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href={"/profile"}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href={"/profile"}
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    className="mt-5 w-full black_btn"
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                >Sign Out</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                ></button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
