import Link from "next/link";
import { UserRepository } from "@/src/repositories/user.repository";
export const dynamic = "force-dynamic";
export default async function UsersPage() {
  const users = await UserRepository.getAllUsers();

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>All Users</h1>

      {users.map((user) => (
        <div key={user.userId} style={{ padding: 8, listStyle: "none" }} className="list-item">
          <Link
            key={user.userId}
            href={`/users/${user.userId}`}
            className="user-item"
          >
            <div className="name">
              {user.name ?? "Unnamed User"}
            </div>
            <div className="email">
              {user.email}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
