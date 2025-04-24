"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function loginAction(prevState: any, formData: FormData) {
    const data = {
        password: formData.get("password"),
    };
    if (data.password === "12345") {
        return {
            success: true,
        };
    } else {
        return {
            errors: ["Wrong Password!"],
        };
    }
}
