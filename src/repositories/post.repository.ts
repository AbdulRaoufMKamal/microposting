import prisma from "@/src/prisma/client";
import { User, Post } from "@/src/generated/prisma/client";

export class PostRepository {

    // 1. Create a new post
    static async createPost(
        userId: string,
        title: string,
        content: string
    ): Promise<Post> {
        return prisma.post.create({
            data: {
                title,
                content,
                userId,
            },
        });
    }

    // 2. Delete a post
    static async deletePost(postId: string): Promise<Post> {
        return prisma.post.delete({
            where: { postId },
        });
    }

    // 3. Get all user's posts
    static async getUserPosts(userId: string): Promise<Post[]> {
        return prisma.post.findMany({
            where: { userId },
        });
    }

    // 4. Get user's first post
    static async getUserFirstPost(userId: string): Promise<Post | null> {
        return prisma.post.findFirst({
            where: { userId },
            orderBy: { postId: "asc" }, // first created
        });
    }

    static async getAllPosts() {
        return prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }

    static async getPostById(postId: string) {
        return prisma.post.findUnique({
            where: { postId },
        });
    }
}
