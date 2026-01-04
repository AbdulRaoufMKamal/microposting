import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col gap-4">
      <LoginForm />

      <p className="text-sm">
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600 underline">
          Register
        </Link>
      </p>
    </div>
  );
}