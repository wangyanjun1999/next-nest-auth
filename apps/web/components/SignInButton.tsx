
import Link from 'next/link'
import React from 'react'
import { getSession } from '@/lib/session'

const SignInButton = async () => {
    const session  = await getSession(); 
  return (
    <div className='flex gap-2 items-center ml-auto' >
    {!session || !session.user ?(
        
        <>
        <Link href="/auth/signin">Sign in</Link>
        <Link href="/auth/signup">Sign up</Link>
        </>
    ):(
        <>
                <p>{session.user.name}</p>
                <Link href="#">Sign out</Link>
        </>
    )}
    
    </div>
  )
}

export default SignInButton