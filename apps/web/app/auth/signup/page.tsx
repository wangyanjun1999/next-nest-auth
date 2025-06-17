import React from 'react';
import Link from 'next/link'; // 假设使用React Router进行路由管理
import { Button } from "@/components/ui/button"
import SignupForm from './signupForm';
import { SubmitButton } from '@/components/ui/submitButton';
// 定义注册页面组件
const SignUpPage = () => {
  return (
    // 页面容器：白色背景、内边距、圆角、阴影、固定宽度、垂直居中布局
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      {/* 页面标题：居中显示、2倍字体大小、加粗、底部边距 */}
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up Page</h1>

      <SignupForm />

      {/* 登录引导区域：弹性布局、左右两端对齐、小字体 */}
      <div className="flex justify-between text-sm mt-4">
        {/* 提示文本：已有账号？ */}
        <p>Already have an account?</p>
        
        {/* 登录链接：下划线样式，点击后跳转至登录页面 */}
        <Link className="underline" href="/auth/signin">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;