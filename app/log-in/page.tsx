"use client";
import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./action";
import Input from "@/components/input";

export default function Login() {
    const { pending } = useFormStatus();
    const [state, dispatch] = useFormState(loginAction, null);
    return (
        <div className="bg-box">
            <div className="w-full py-10 text-center mt-20 mb-12">
                <h1 className="text-4xl font-bold text-white text-shadow-lg">Welcome!</h1>
            </div>
            <div>
                <form
                    action={dispatch}
                    className="w-full grid grid-cols-1 gap-6"
                >
                    <Input
                        type="text"
                        name="email"
                        className="input-style"
                        placeholder="Email"
                        required
                        errors={state?.fieldErrors.email}
                    />
                    <Input
                        type="password"
                        name="password"
                        className="input-style"
                        placeholder="Password"
                        errors={state?.fieldErrors.password}
                        required
                    />
                    <button
                        disabled={pending}
                        className="form-btn"
                    >
                        {pending ? "Loading..." : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
