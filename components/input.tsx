import { InputHTMLAttributes } from "react";

interface InputProp {
    name: string;
    errors?: string[];
}

export default function Input({ name, errors = [], ...rest }: InputProp & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="grid grid-cols-1">
            <input
                className="input-style"
                name={name}
                {...rest}
            />
            {errors.map((error, index) => (
                <span
                    key={index}
                    className="text-red-600 text-base font-semibold"
                >
                    {index + 1 + ". " + error}
                </span>
            ))}
        </div>
    );
}
