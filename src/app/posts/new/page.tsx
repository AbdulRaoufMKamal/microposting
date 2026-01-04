import { createPostAction } from "@/src/lib/posts/actions";

export default function NewPostPage() {
  return (
    <form action={createPostAction} className="form">
      <h1>Create Post</h1>

      <div className="form-field">
        <input
          name="title"
          placeholder="Title"
          required
        />
      </div>

      <div className="form-field">
        <textarea
          name="content"
          placeholder="Write your post..."
          required
        />
      </div>

      <button type="submit" className="primary">
        Post
      </button>
    </form>
  );
}
