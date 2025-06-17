"use client"
import React, { useActionState } from 'react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { signup } from '@/lib/auth'
import { FormState } from '@/lib/type'
import { SubmitButton } from '@/components/ui/submitButton'
export const signupForm = () => {
  const [state, formAction] = useActionState(signup, undefined);
  return (
    <form action={formAction}>
        <div className='flex flex-col gap-2'>
          {state?.message && <p className='text-red-500'>{state.message}</p>}
            <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" placeholder='Enter your name' />
            </div>
            {state?.error?.name && <p className='text-red-500'>{state.error.name}</p>}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder='Enter your email' />
            </div>
            {state?.error?.email && <p className='text-red-500'>{state.error.email}</p>}
            
            <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" placeholder='Enter your password' />
            </div>
            {state?.error?.password &&(
              <div>
                <p>Password must: </p>
                <ul>
                {
                state.error.password.map(
                  (error, index) => (
                  <li key={index} className='text-red-500'>{error}</li>
                ))}
                </ul>
              
              </div>
            )}
            
        </div>
        {/*  useFormStatus 会向上遍历其组件树，查找最近的父级 <form> 元素。
        一旦找到，它就会订阅该表单的提交状态。
        当该表单被提交时（无论是通过 formAction 还是 type="submit" 按钮），
        pending 状态就会变为 true，提交完成后会变回 false*/}
        {/* NOTE: 只能在其关联的 <form> 元素的子孙组件中使用 */} 
        <SubmitButton>Sign Up</SubmitButton>
    </form>
  )
}

export default signupForm;