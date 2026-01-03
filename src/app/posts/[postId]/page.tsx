import { PostRepository } from "@/src/repositories/post.repository";
import { getCurrentUser } from "@/src/lib/actions";
import PostCard from "@/src/components/cards/postCard";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const post = await PostRepository.getPostById(postId);
  const user = await getCurrentUser();

  if (!post) {
    notFound();
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1 style={{ marginBottom: 16 }}>Post</h1>

      <PostCard post={post} user={user} />
    </div>
  );
}
