import prisma from "@/src/prisma/client";

export class PostTranslationRepository {

    static async getPostTranslationById(postId: string,
        language: string) {
        return await prisma.postTranslation.findUnique({
            where: {
                postId_language: {
                    postId,
                    language,
                },
            },
        });
    }

    static async createPostTranslation(postId: string, language: string, translatedContent: string) {
        return await prisma.postTranslation.create({
            data: {
                postId,
                language,
                content: translatedContent,
            },
        });
    }
}
