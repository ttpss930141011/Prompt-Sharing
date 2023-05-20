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

    const handleEdit = (post: Prompt) => {
        const { _id } = post;
        if (!_id) console.error("Invalid post ID");
        router.push(`/update-prompt?id=${_id}`);
    };

    const handleDelete = async (post: Prompt) => {
        const hasConfirmed = confirm("Are you sure you want to delete this post?");
        if (!hasConfirmed) return;
        const { _id } = post;
        if (!_id) console.error("Invalid post ID");
        const response = await fetch(`/api/prompt/${_id}`, {
            method: "DELETE",
        });
        const filteredPost = myPosts.filter((p) => p._id !== _id);
        setMyPosts(filteredPost);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = (await response.json()) as Prompt[];
            console.log("fetchPosts", data);
            setMyPosts(data);
        };
        fetchPosts();
    }, []);
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
