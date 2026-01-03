import { createPostAction } from "@/src/lib/posts/actions";

export default function NewPostPage() {
  return (
    <form action={createPostAction} style={{ maxWidth: 400 }}>
      <h1>Create Post</h1>

      <input
        name="title"
        placeholder="Title"
        required
      />

      <textarea
        name="content"
        placeholder="Write your post..."
        required
      />

      <button type="submit">Post</button>
    </form>
  );
}
