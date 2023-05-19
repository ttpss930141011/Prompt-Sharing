import { connectToDB } from "@/utils/database";
import PromptRepo from "@/utils/database/repository/PromptRepo";

export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();
        const { id } = params;
        const prompts = await PromptRepo.findByCreator(id);

        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response("Failed to fetch all prompts", {
            status: 500,
        });
    }
};
