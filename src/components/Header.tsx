"use client";

import { usePathname } from "next/navigation";
import LogoutButton from "@/src/components/buttons/logoutButton";

export default function Header() {
  const pathname = usePathname();

  const hideLogout =
    pathname === "/login" || pathname === "/register";

  return (
    <header className="flex items-center justify-between border-b p-4">
      <h1 className="font-bold">MicroPost</h1>

      {!hideLogout && <LogoutButton />}
    </header>
  );
}
