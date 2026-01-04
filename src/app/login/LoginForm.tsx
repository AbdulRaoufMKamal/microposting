"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "../../lib/actions";
import Toast from "@/src/components/Toast";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const [toast, setToast] = useState<string | null>(null);

  // Show toast on login failure
  useEffect(() => {
    if (state?.message) {
      setToast(state.message);
    }
  }, [state]);

  return (
    <>
      <form action={loginAction} className="form">
        <h1>Login</h1>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" />
          {/* {state?.errors?.email && (
            <small style={{ color: "var(--danger)" }}>
              {state.errors.email}
            </small>
          )} */}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
          />
          {/* {state?.errors?.password && (
            <small style={{ color: "var(--danger)" }}>
              {state.errors.password}
            </small>
          )} */}
        </div>

        <SubmitButton />
      </form>

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="primary"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
