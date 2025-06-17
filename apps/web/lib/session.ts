"use server"
import { cookies } from "next/headers";
import { BACKEND_URL } from "./constants";
import * as jose from 'jose'
import { redirect } from "next/navigation";
    export type Session={
    user:{
        id:string;
        name: string;
    }
    // accessToken: string;
    // refreshToken: string;
}


// 创建session
const SECRET_KEY = process.env.SESSION_SECRET_KEY
const encoderKey = new TextEncoder().encode(SECRET_KEY)



export async function createSession(payload: Session){
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 *60 *1000)
    console.log("🚀 ~ createSession ~ expiredAt:", expiredAt)
   
    const session = await new jose.SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setExpirationTime(expiredAt)
        .sign(encoderKey)


    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 6,
        sameSite: 'lax', // 接收根域名下的请求
        path: '/', // 对所有路径都有效
    })


    }



export async function getSession(): Promise<Session | null> {
        const cookieStore = await cookies()
        const session = cookieStore.get('session') // 和set的name一致
        if (!session) {
            return null
        }
        try {
            const {payload} = await jose.jwtVerify(session.value, encoderKey, {
                algorithms: ['HS256'],
            });

            if (!payload.exp) {
                return null; // 令牌没有过期时间
            }

            if (payload.exp < Date.now() / 1000) {
                return null; // 令牌已过期
            }

            return payload as Session
            
        } catch (error) {
            console.error('Failed to verify session:', error);
            redirect('/auth/signin') // 重定向到登录页
        }
    }   


export async function deleteSession(){
        const cookieStore = await cookies()
        cookieStore.delete('session')

    


    }
