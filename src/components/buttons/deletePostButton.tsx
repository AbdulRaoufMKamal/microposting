"use client";

import { deletePostAction } from "@/src/lib/posts/actions";

export default function DeletePostButton({ postId }: { postId: string }) {
  return (
    <form action={deletePostAction.bind(null, postId)}>
      <button
        type="submit"
        style={{ color: "red", marginTop: 8 }}
        onClick={(e) => {
          if (!confirm("Are you sure you want to delete this post?")) {
            e.preventDefault();
          }
        }}
      >
        Delete
      </button>
    </form>
  );
}
