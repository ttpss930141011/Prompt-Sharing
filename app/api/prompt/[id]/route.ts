import { connectToDB } from "@/utils/database";
import Prompt from "@/utils/database/models/prompt";
import PromptRepo from "@/utils/database/repository/PromptRepo";
import { Types } from "mongoose";
// import type { NextApiRequest, NextApiResponse } from 'next';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();
        const prompt = await PromptRepo.findById(params.id);
        if (!prompt) return new Response("No prompt found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        if (!id) return new Response("Parameter not found", { status: 404 });
        const { prompt, tag } = await request.json();
        await connectToDB();
        const updatedPrompt = await PromptRepo.findByIdAndUpdate(params.id, {
            prompt,
            tag,
        });

        if (!updatedPrompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify(updatedPrompt), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const { id } = params;
        if (!id) return new Response("Parameter not found", { status: 404 });
        const deletedPrompt = await PromptRepo.findByIdAndDelete(params.id);
        return new Response(JSON.stringify(deletedPrompt), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
};
