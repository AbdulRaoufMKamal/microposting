import { PostRepository } from "@/src/repositories/post.repository";
import { NewPostButton } from "@/src/components/buttons/newPostButton";
import { GetUsersButton } from "@/src/components/buttons/getUsersButton";
import { UserRepository } from "@/src/repositories/user.repository";
import { getCurrentUser } from "@/src/lib/actions";
import PostCard from "../../components/cards/postCard";
import { isSessionExpired } from "@/src/lib/session";
import { redirect } from "next/navigation";

export default async function PostsPage() {
  if(await isSessionExpired()) {
    redirect("/login");
  }
  const [posts, users, currentUser] = await Promise.all([
    PostRepository.getAllPosts(),
    UserRepository.getAllUsers(),
    getCurrentUser()
  ]);

  const userDict = Object.fromEntries(
    users.map((user) => [user.userId, user])
  );

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>All Posts</h1>
        <NewPostButton />
        <GetUsersButton />
      </div>

      {posts.map((post) => (
        <PostCard key={post.postId} post={post} user={userDict[post.userId]} isCurrentUser={currentUser?.userId === post.userId} />
      ))}
    </div>

  );
}
