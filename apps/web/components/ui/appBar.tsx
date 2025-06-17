import Link from 'next/link';
import React from 'react'
import SignInButton from '../SignInButton'

const AppBar = () => {
  return (
    <div className='flex gap-3 bg-gradient-to-br from-blue-400 to-cyan-400 p-2 shadow'>
<Link href="/"> Home</Link>
<Link href="/dashboard"> Dashboard</Link>


<SignInButton />

    </div>
  )
}

export default AppBar;