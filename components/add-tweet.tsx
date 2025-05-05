"use client";

import { CreateTweet } from "@/app/(private)/action";
import { useFormState } from "react-dom";

export default function AddTweet() {
    const [state, dispatch] = useFormState(CreateTweet, null);
    return (
        <div className="w-full mb-6">
            <form
                action={dispatch}
                className="grid grid-cols-1 gap-2"
            >
                <textarea
                    name="tweet"
                    required
                    className="bg-white/70 placeholder:text-gray-500 p-4 rounded-lg focus:outline-hidden focus:inset-shadow-sm/70 focus:inset-shadow-indigo-600"
                    placeholder="What's on your mind?"
                />
                <button className="form-btn">Send</button>
                {state?.formErrors ? <span className="text-red-600">{state?.formErrors}</span> : null}
            </form>
        </div>
    );
}
