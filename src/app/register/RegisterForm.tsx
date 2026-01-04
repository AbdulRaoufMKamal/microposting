"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { register } from "../../lib/actions";
import Toast from "@/src/components/Toast";

export function RegisterForm() {
    const [state, registerAction] = useActionState(register, undefined);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (state?.message) {
            setToast(state.message);
        }
    }, [state]);

    return (
        <form action={registerAction} className="form">
            <h1>Register</h1>
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" />
            </div>

            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" />
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
            {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
        </form>

        
    )
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit">
            {pending ? "Registering..." : "Register"}
        </button>
    );
}