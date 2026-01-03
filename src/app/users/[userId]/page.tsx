import { PostRepository } from "@/src/repositories/post.repository";
import PostCard from "@/src/components/cards/postCard";
import { getCurrentUser } from "@/src/lib/actions";
import Link from "next/link";

export default async function UserPostsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const [posts, firstPost, user] = await Promise.all([
    PostRepository.getUserPosts(userId),
    PostRepository.getUserFirstPost(userId),
    getCurrentUser(),
  ]);

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>User Posts</h1>

        {/* ✅ First post button */}
        {firstPost && (
          <Link href={`/posts/${firstPost.postId}`}>
            <button>Go to First Post</button>
          </Link>
        )}
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} user={user} />
      ))}
    </div>
  );
}
