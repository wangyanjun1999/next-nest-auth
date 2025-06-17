import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react'

async function DashboardPage() {
const session =await getSession()

// 如果用户没有登录，则重定向到登录页面
if(!session || !session.user){
  redirect('/auth/signin')
}

// 如果用户已经登录，则显示仪表盘页面
  return (
    <>
    <h1>Dashboard</h1>
    <p>Welcome {session.user.name}</p>
    </>
  )
}

export default DashboardPage;