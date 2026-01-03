import prisma from "@/src/prisma/client";
import { User, Post } from "@/src/generated/prisma/client";

export class UserRepository {
    // 1. Create a new user
    static async createUser(email: string, passwordHash: string, name: string): Promise<User> {
        return prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
            },
        });
    }

    // 2. Get all users
    static async getAllUsers(): Promise<User[]> {
        return prisma.user.findMany();
    }


    // 3. Get a specific user by ID
    static async getUserById(userId: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { userId },
        });
    }

    // 4. Get a specific user by email
    static async getUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

}
