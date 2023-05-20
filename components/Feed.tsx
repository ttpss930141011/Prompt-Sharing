"use client";
import React, { useEffect, useState, FC } from "react";
import PromptCard from "./PromptCard";
import Prompt from "@/utils/database/models/prompt";

type PromptCardListProps = {
    data: Prompt[];
    handleTagClick: (tagName: string) => void;
};
const PromptCardList: FC<PromptCardListProps> = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post, index) => (
                <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    );
};
const Feed = () => {
    const [searchText, setDesearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const handleSearchChange = () => {};
    const handleTagClick = (tagName: string) => {
        console.log(tagName);
        // setSearchText(tagName);

        // const searchResult = filterPrompts(tagName);
        // setSearchedResults(searchResult);
    };
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();
            console.log(data);
            setPosts(data);
        };
        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form action="" className="relative w-full flex-center">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer"
                    placeholder="Search for a tag or a username"
                />
            </form>

            <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;
