"use client";
import Input from "@/components/input";
import { useFormState, useFormStatus } from "react-dom";
import { CreateAccountAction } from "./action";

export default function CreateAccount() {
    const [state, dispatch] = useFormState(CreateAccountAction, null);
    const { pending } = useFormStatus();
    return (
        <div className="bg-box">
            <div className="w-full py-10 text-center mt-20 mb-12">
                <h1 className="text-4xl font-bold text-white text-shadow-lg">Sign Up</h1>
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
                        type="text"
                        name="username"
                        className="input-style"
                        placeholder="Username"
                        required
                        errors={state?.fieldErrors.username}
                    />
                    <Input
                        type="password"
                        name="password"
                        className="input-style"
                        placeholder="Password"
                        errors={state?.fieldErrors.password}
                        required
                    />
                    <Input
                        type="password"
                        name="confirm_password"
                        className="input-style"
                        placeholder="Confirm Password"
                        errors={state?.fieldErrors.confirm_password}
                        required
                    />
                    <button
                        disabled={pending}
                        className="form-btn"
                    >
                        {pending ? "Loading..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
}
