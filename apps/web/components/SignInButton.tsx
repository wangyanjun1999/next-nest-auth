import Link from 'next/link'
import React from 'react'
import { getSession, Session     } from '@/lib/session'

        const SignInButton =async () => {
            const session = await getSession()    

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
                {/* <a href="/api/auth/signout">Sign out</a> */}

         {/* 🔧 核心修复：使用表单提交而不是 Link 组件 */}
         <form action="/api/auth/signout" method="GET" className="inline">
                        <button 
                            type="submit" 
                            className="text-blue-600 hover:text-blue-800 underline bg-transparent border-none cursor-pointer"
                        >
                            Sign out
                        </button>
                    </form>

        </>
    )}
    
    </div>
  )
}

export default SignInButton