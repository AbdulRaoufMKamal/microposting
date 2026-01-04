"use client";

import { deletePostAction } from "@/src/lib/posts/actions";

export default function DeletePostButton({ postId, className="" }: { postId: string, className?: string }) {
  return (
    <form action={deletePostAction.bind(null, postId)}>
      <button
        type="submit"
        className={`danger ${className}`}
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
