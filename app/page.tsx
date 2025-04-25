"use client";
import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./action";
import Input from "@/components/input";

export default function Home() {
    const { pending } = useFormStatus();
    const [state, dispatch] = useFormState(loginAction, null);
    return (
        <div className="w-[400px] h-[800px] bg-gradient-to-b from-bg-top to-bg-bottom mx-auto mt-20 rounded-2xl flex flex-col">
            <div className="w-full py-10 text-center mt-20 mb-12">
                <h1 className="text-4xl font-bold text-white text-shadow-lg">Welcome!</h1>
            </div>
            <div>
                <form
                    action={dispatch}
                    className="w-full px-8 grid grid-cols-1 gap-6"
                >
                    <Input
                        type="text"
                        name="email"
                        className="input-style"
                        placeholder="Email"
                        required
                        errors={state?.errors?.fieldErrors.email}
                    />
                    <Input
                        type="text"
                        name="username"
                        className="input-style"
                        placeholder="Username"
                        required
                        errors={state?.errors?.fieldErrors.username}
                    />
                    <Input
                        type="password"
                        name="password"
                        className="input-style"
                        placeholder="Password"
                        errors={state?.errors?.fieldErrors.password}
                        required
                    />
                    <button
                        disabled={pending}
                        className="form-btn"
                    >
                        {pending ? "Loading..." : "Log In"}
                    </button>
                    {state?.success == true ? <div className="welcome-box">Welcome Back! 😍</div> : null}
                </form>
            </div>
        </div>
    );
}
