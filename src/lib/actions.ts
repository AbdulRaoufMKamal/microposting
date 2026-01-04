"use server";

import { z } from "zod";
import { getSession, createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import prisma from "../prisma/client";
import { User } from "../generated/prisma/client";
import { UserRepository } from "../repositories/user.repository";
const bcrypt = require('bcrypt');

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .trim(),
});

const registerSchema = z.object({
    name: z.string().nonempty({ message: "Name must be at least 2 characters" }).trim(),
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .trim(),
});

export async function login(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            message: "Invalid email or password",
            errors: result.error.flatten().fieldErrors,
        }
    }

    const { email, password } = result.data;

    const user: User | null = await UserRepository.getUserByEmail(email);

    const isValid = await bcrypt.compare(password, user?.passwordHash);


    if (!user || !isValid) {
        return {
            message: "Invalid email or password",
        };
    }


    await createSession(user.userId);
    redirect("/posts");


}

export async function logout() {
    await deleteSession();
    redirect("/login");
}

export async function register(prevState: any, formData: FormData) {

    const result = registerSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return {
            message: errors.name?.[0] || errors.email?.[0] || errors.password?.[0]
        }
    }

    const { name, email, password } = result.data;

    const existingUser: User | null = await UserRepository.getUserByEmail(email);

    if (existingUser) {
        return {
            message: "User already exists",
        }
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            passwordHash: passwordHash,
        },
    });

    await createSession(user.userId);
    redirect("/posts");

}


export async function getCurrentUser(): Promise<User | null> {
    const session = await getSession();
    if (!session) {
        return null;
    }
    return await UserRepository.getUserById(session.userId);
}