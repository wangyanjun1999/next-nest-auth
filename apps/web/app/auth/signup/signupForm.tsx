import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export const signupForm = () => {
  return (
    <form>
        <div className='flex flex-col gap-2'>
            <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" placeholder='Enter your name' />
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder='Enter your email' />
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" placeholder='Enter your password' />
            </div>
            
            
        </div>
    </form>
  )
}

export default signupForm;