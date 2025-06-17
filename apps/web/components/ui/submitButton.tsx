"use client"
import React, { PropsWithChildren } from 'react'
import { Button } from './button'
import { useFormStatus } from 'react-dom'

export const SubmitButton = ({children}: PropsWithChildren) => {
    const { pending} = useFormStatus();
    console.log(children);
  return (
    <Button type="submit" aria-disabled={pending}  className='w-full mt-2'>
        {  pending ? "Submitting..." : children}
     </Button>
  )
}

export default SubmitButton;