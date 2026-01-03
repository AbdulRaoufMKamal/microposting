"use client";

type Props = {
  userId: string;
};

export function FirstPostButton({ userId }: Props) {
  return (
    <a href={`/users/${userId}?first=true`}>
      <button>
        Get First Post
      </button>
    </a>
  );
}
