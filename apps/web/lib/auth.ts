import { redirect } from "next/navigation";
import { FormState, SignupFormSchema } from "./type";
import { BACKEND_URL } from "./constants";

export async function signup(state: FormState,formData: FormData): Promise<FormState> {
    
    // 1. 验证表单数据
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }


    // 2. 发送请求
    const response: Response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
    });

    // 3. 处理响应
    if (!response.ok) {
        
        return {
            message: response.status === 409 ? "Email already exists" : ` Failed to signup: ${response.statusText}`,
        };
    }

    // 4. 重定向
    redirect("/auth/signin");












    
}