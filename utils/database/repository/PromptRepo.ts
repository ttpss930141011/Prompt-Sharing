import Prompt, { PromptsModel } from "@/utils/database/models/prompt";

export default class PromptRepo {
    // contains critical information of the user
    static findAll(): Promise<Prompt[] | null> {
        return PromptsModel.find({ status: true }).populate("creator").lean().exec();
    }

    static findByCreator(creator: string): Promise<Prompt | null> {
        return PromptsModel.findOne({ creator, status: true }).lean().exec();
    }

    static async create(prompt: Prompt): Promise<Prompt> {
        const createdPrompt = await PromptsModel.create(prompt);
        return createdPrompt.toObject();
    }

    static async update(prompt: Prompt): Promise<Prompt> {
        await PromptsModel.updateOne({ _id: prompt.creator }, { $set: { ...prompt } })
            .lean()
            .exec();
        return prompt;
    }
}
