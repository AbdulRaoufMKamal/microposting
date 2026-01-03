import Link from "next/link";

export function NewPostButton() {
  return (
    <Link href="/posts/new">
      <button style={{ marginRight: 8 }}>
        + New Post
      </button>
    </Link>
  );
}
