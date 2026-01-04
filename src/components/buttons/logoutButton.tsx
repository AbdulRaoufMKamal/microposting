"use client";

import { logout } from "@/src/lib/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="danger"
      >
        Logout
      </button>
    </form>
  );
}
