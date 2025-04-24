"use client";
import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "./action";

export default function Home() {
    const { pending } = useFormStatus();
    const [state, dispatch] = useFormState(loginAction, null);
    return (
        <div className="w-[400px] h-[800px] bg-gradient-to-b from-bg-top to-bg-bottom mx-auto mt-20 rounded-2xl flex flex-col">
            <div className="w-full py-10 text-center mt-20 mb-12">
                <h1 className="text-4xl font-bold">Welcome!</h1>
            </div>
            <div>
                <form
                    action={dispatch}
                    className="w-full px-8 grid grid-cols-1 gap-6"
                >
                    <input
                        type="text"
                        name="email"
                        className="input-style"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        className="input-style"
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="input-style"
                        placeholder="Password"
                        required
                    />
                    {state?.errors
                        ? state.errors.map((error, index) => (
                              <span
                                  key={index}
                                  className="text-red-600 text-lg font-semibold"
                              >
                                  {error}
                              </span>
                          ))
                        : []}
                    <button className="form-btn">{pending ? "Loading..." : "Log In"}</button>
                    {state?.success ? <div className="welcome-box">Welcome Back! 😍</div> : null}
                </form>
            </div>
        </div>
    );
}
