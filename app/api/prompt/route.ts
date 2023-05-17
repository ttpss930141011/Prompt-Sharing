import { connectToDB } from "@/utils/database";
import PromptRepo from "@/utils/database/repository/PromptRepo";

export const GET = async (request: Request) => {
    try {
        await connectToDB();
        const prompts = await PromptRepo.findAll();

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to fetch all prompts", {
            status: 500,
        });
    }
};
