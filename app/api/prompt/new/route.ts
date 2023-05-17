import { connectToDB } from "@/utils/database";
import Prompt from "@/utils/database/models/prompt";
import PromptRepo from "@/utils/database/repository/PromptRepo";
import { Types } from "mongoose";
// import type { NextApiRequest, NextApiResponse } from 'next';

interface PostRequestBody {
    prompt: string;
    userId: Types.ObjectId;
    tag: string;
}

export const POST = async (request: Request) => {
    try {
        const { userId, prompt, tag } = await (request.json() as Promise<PostRequestBody>);
        await connectToDB();
        const newPrompt: Prompt = { _id: new Types.ObjectId(), creator: userId, prompt, tag };
        await PromptRepo.create(newPrompt);
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};
