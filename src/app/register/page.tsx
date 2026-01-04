import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default function Login() {
  return (
    <div className="flex flex-col gap-4">
      <RegisterForm />

      <p className="text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}