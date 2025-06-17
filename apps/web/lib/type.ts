import { z } from "zod";
    
    // 导出一个名为FormState的类型定义（用于定义表单状态的数据结构）
export type FormState = {
    // 错误信息对象（用于存储表单验证相关的错误状态）
    error?: {
      // 姓名字段的错误信息（可选字符串，未填写或格式错误时存储提示文本）
      name?: string[];
      // 邮箱字段的错误信息（可选字符串，用于验证邮箱格式是否正确）
      email?: string[];
      // 密码字段的错误信息（可选字符串数组，支持多个验证规则错误，如长度/复杂度等）
      password?: string[];
      // 全局错误信息（可选字符串，用于展示表单提交时的整体错误提示）
    };


    message?: string;
  } 
   | undefined ; 



   // 定义注册表单的验证模式对象
export const SignupFormSchema = z.object({
    // 姓名字段验证规则
    name: z
      .string() // 限定为字符串类型
      .min(2, { 
        message: "Name must be at least 2 characters long." // 最小长度2，提示信息
      })
      .trim(), // 去除输入前后的空格
  
    // 邮箱字段验证规则
    email: z
      .string() // 限定为字符串类型
      .email({ 
        message: "Please enter a valid email." // 验证邮箱格式，提示信息
      })
      .trim(), // 去除输入前后的空格
  
    // 密码字段验证规则
    password: z
      .string() // 限定为字符串类型
      .min(8, { 
        message: "Password must be at least 8 characters long." // 最小长度8，提示信息
      })
      .regex(/[a-zA-Z]/, { 
        message: "Password must contain at least one letter." // 必须包含至少一个字母
      })
      .regex(/[0-9]/, { 
        message: "Password must contain at least one number." // 必须包含至少一个数字
      })
      .regex(/[^a-zA-Z0-9]/, { 
        message: "Password must contain at least one special character." // 必须包含至少一个特殊字符
      })
      .trim(), // 去除输入前后的空格
  });