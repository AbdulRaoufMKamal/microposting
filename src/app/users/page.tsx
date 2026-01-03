import Link from "next/link";
import { UserRepository } from "@/src/repositories/user.repository";

export default async function UsersPage() {
  const users = await UserRepository.getAllUsers();

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>All Users</h1>

      {users.map((user) => (
        <div key={user.userId} style={{ padding: 8 }}>
          <Link href={`/users/${user.userId}`}>
            {user.name ?? user.email}
          </Link>
        </div>
      ))}
    </div>
  );
}
