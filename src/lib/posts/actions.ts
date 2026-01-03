"use server";

import { PostRepository } from "@/src/repositories/post.repository";
import { getCurrentUser } from "@/src/lib/actions";
import { redirect } from "next/navigation";
import { User } from "@/src/generated/prisma/browser";
import { revalidatePath } from "next/cache";
import { getTranslatedPost } from "./translate";

export async function createPostAction(formData: FormData) {
  const user : User | null = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    throw new Error("Invalid input");
  }

  await PostRepository.createPost(user.userId, title, content);

  redirect("/posts");
}

export async function deletePostAction(postId: string) {
  const user = await getCurrentUser();

  if(!user) {
    throw new Error("Unauthorized");
  }

  const post = await PostRepository.getPostById(postId);

  if(!post) {
    throw new Error("Post not found");
  }

  if(post.userId !== user.userId) {
    throw new Error("Forbidden");
  }

  await PostRepository.deletePost(postId);

  revalidatePath("/posts");
}

export async function translatePostAction(
  postId: string,
  language: string
) {
  const post = await PostRepository.getPostById(postId);

  if (!post) throw new Error("Post not found");

  const translated = await getTranslatedPost(
    postId,
    post.content,
    language
  );

  return translated;
}

