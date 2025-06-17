"use client"
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/submitButton'
import Link from 'next/link'
import { signIn } from '@/lib/auth'
import { useActionState } from 'react'
const SignInForm = () => {
    const [state, formAction] = useActionState(signIn, undefined);
    return (
        // formAction会自动调用signIn函数，并传递state和formData
        <form action={formAction}>
            {state?.message && <p className='text-red-500'>{state.message}</p>}
            <div className='flex flex-col gap-2 w-64'>

                    <Label htmlFor='email'>
                        Email
                    </Label>
                    <Input
                        id='email'
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        className='w-full'
                    />

            {state?.error?.email && <p className='text-red-500'>{state.error.email.join(', ')}</p>}


                <Label htmlFor='password'>
                    Password
                </Label>
                <Input
                    id='password'
                    type='password'
                    name='password'
                    placeholder='Enter your password'
                    className='w-full '
                />

            {state?.error?.password && <p className='text-red-500'>{state.error.password.join(', ')}</p>}
            <Link href='#' className='text-sm underline' >Forgot Password?</Link>
            </div>
            <SubmitButton>Sign In</SubmitButton>
        </form>
    )
}

export default SignInForm