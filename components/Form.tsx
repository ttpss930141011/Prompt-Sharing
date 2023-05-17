"use client";
import { postType } from "@/app/create-prompt/page";
import Link from "next/link";
import React, { FC } from "react";

type FormProps = {
    type: string;
    post: postType;
    setPost: any;
    submitting: boolean;
    handleSubmit: any;
};
const Form: FC<FormProps> = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your imagination run wild
                with any AI-powered platform
            </p>
            <form
                action=""
                onSubmit={handleSubmit}
                className="mt-10 w-full flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>
                    <textarea
                        className="form_textarea"
                        name="prompt"
                        value={post.prompt}
                        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                        required
                        placeholder="Write your prompt here..."
                    ></textarea>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Field of Prompt{" "}
                        <span className="font-normal">
                            (#product, #webdevelopment, #idea, etc.)
                        </span>
                    </span>
                    <input
                        className="form_input"
                        name="prompt"
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        required
                        placeholder="#tag"
                    ></input>
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href="" className="text-sm text-grap-500">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submitting ? `${type}ing...` : type}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Form;
