import Link from "next/link";

export function GetUsersButton() {
  return (
    <Link href="/users">
      <button style={{ marginRight: 8 }}>
        View Users
      </button>
    </Link>
  );
}
