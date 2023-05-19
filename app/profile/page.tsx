"use client";
import Profile from "@/components/Profile";
import Prompt from "@/utils/database/models/prompt";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [myPosts, setMyPosts] = useState<Prompt[]>([]);

    const handleEdit = (id: string) => {
        router.push(`/prompt/${id}`);
    };

    const handleDelete = (id: string) => {
        console.log(id);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = (await response.json()) as Prompt[];
            console.log(data);
            setMyPosts(data);
        };
        fetchPosts();
    }, [session?.user.id]);
    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;
