import Prompt, { PromptsModel } from "@/utils/database/models/prompt";

export default class PromptRepo {
    // contains critical information of the user
    static findAll(): Promise<Prompt[] | null> {
        return PromptsModel.find({ status: true }).populate("creator").lean().exec();
    }

    static findById(id: string): Promise<Prompt | null> {
        return PromptsModel.findOne({ _id: id, status: true }).populate("creator").lean().exec();
    }

    static findByCreator(creator: string): Promise<Prompt[] | null> {
        return PromptsModel.find({ creator, status: true }).populate("creator").lean().exec();
    }

    static async create(prompt: Prompt): Promise<Prompt> {
        const createdPrompt = await PromptsModel.create(prompt);
        return createdPrompt.toObject();
    }

    static async findByIdAndUpdate(id: string, prompt: Partial<Prompt>): Promise<Prompt | null | undefined> {
        const updatedPrompt = await PromptsModel.findByIdAndUpdate(id, prompt, { new: true });
        return updatedPrompt?.toObject();
    }

    static async findByIdAndDelete(id: string): Promise<Prompt | null | undefined> {
        const deletedPrompt = await PromptsModel.findByIdAndDelete(id);
        return deletedPrompt?.toObject();
    }

    static async update(prompt: Prompt): Promise<Prompt> {
        await PromptsModel.updateOne({ _id: prompt.creator }, { $set: { ...prompt } })
            .lean()
            .exec();
        return prompt;
    }
}
