import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

// [步骤1-🎬 开始] 启动中间件函数 middleware - 就像一个保安站在大门口，决定谁可以进入
export default async function middleware(request: NextRequest) {
    console.log("[步骤1-🎬 开始] 启动中间件函数 middleware - 就像一个保安站在大门口，决定谁可以进入。");

    // [步骤2-📋 准备] 准备从请求中获取用户的会话信息，看看这位“访客”有没有“通行证”
    console.log("[步骤2-📋 准备] 准备从请求中获取用户的会话信息，看看这位“访客”有没有“通行证”。");
    // [步骤3-⚡ 执行] 尝试获取当前用户的会话（Session）
    console.log("[步骤3-⚡ 执行] 正在尝试从会话服务获取当前用户的会话。");
    console.log(`[步骤3-📊 数据] request (传入的原始Next.js请求对象): ${JSON.stringify({ url: request.url, method: request.method, headers: Object.fromEntries(request.headers.entries()) }, null, 2)} (类型: NextRequest)`);

    let session = null;
    try {
        session = await getSession();
        // [步骤4-📊 数据] session: null/undefined → 获取到的会话对象 (类型: Session | null)
        //                会话对象通常包含用户ID、用户名等信息。
        console.log(`[步骤4-📊 数据] session (获取到的会话对象): ${session ? JSON.stringify(session, null, 2) : 'null'} (类型: ${typeof session})`);
    } catch (error: any) {
        // [步骤4-🛡️ 防护] 捕获getSession可能抛出的异常
        console.error(`[‼️潜在问题点与风险] 获取会话时发生错误！getSession可能因网络异常或会话服务故障而失败。`);
        console.error(`[‼️潜在问题点与风险] 错误详情: ${error.message}`);
        // 如果获取会话失败，我们仍然需要决定如何处理，这里暂时按无会话处理
        session = null;
        console.log(`[步骤4-📊 数据] session: 发生了错误，重置为 → ${session} (类型: ${typeof session})`);
    }

    // [步骤5-🤔 判断] 检查会话是否存在或者会话中是否有用户数据 - 这就像检查通行证是否有效，并且上面有没有你的名字
    console.log("[步骤5-🤔 判断] 检查会话是否存在或者会话中是否有用户数据。这就像检查通行证是否有效，并且上面有没有你的名字。");
    console.log(`[步骤5-💡 解释] 如果没有会话（!session），意味着你根本没有通行证；如果没有会话用户（!session.user），意味着你的通行证是空的，或者无效的。`);
    console.log(`[步骤5-🤔 判断] 判断条件：!session (${!session}) || !session.user (${!session?.user})`);

    if(!session || !session.user){
        // [步骤6-⚡ 执行] 如果没有有效的通行证，那就重定向到登录页面 - 就像保安引导没有通行证的人去入口处办理手续
        console.log("[步骤6-⚡ 执行] 检测到没有有效的会话或用户数据。");
        console.log("[步骤6-📋 准备] 准备重定向到登录页面 /auth/signin。");
        const redirectUrl = new URL('/auth/signin', request.url).toString();
        console.log(`[步骤6-🎯 结果] 接下来会发生什么？我们将使用NextResponse.redirect创建一个响应，告诉浏览器跳转到指定URL: ${redirectUrl}。`);
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    // [步骤7-✅ 完成] 会话有效，用户已认证 - 恭喜，通行证有效，可以放行！
    console.log("[步骤7-✅ 完成] 会话有效，用户已认证！恭喜，通行证有效，可以放行！");
    // [步骤7-⚡ 执行] 允许请求继续处理，访问受保护的页面
    console.log("[步骤7-⚡ 执行] 允许请求继续处理，访问受保护的页面。");
    console.log("[步骤7-🎯 结果] 接下来会发生什么？我们将使用NextResponse.next()，让请求继续正常处理。");
    return NextResponse.next()
}


// [步骤8-📋 准备] 配置中间件的匹配路径 - 这就像告诉保安，他只需要在这些特定的“区域”进行检查
console.log("[步骤8-📋 准备] 配置中间件的匹配路径 - 这就像告诉保安，他只需要在这些特定的“区域”进行检查。");
export const config = {
    // [步骤9-📊 数据] matcher: [] → ['/profile'] (类型: string[])
    // [步骤9-💡 解释] 'matcher' 数组定义了哪些路径会触发此中间件。
    //                只有当请求的URL路径匹配到此数组中的模式时，上面的 `middleware` 函数才会被执行。
    //                在这里，只有访问 '/profile' 路径时，才会进行会话检查。
    // [‼️潜在问题点与风险] 如果matcher配置错误，可能导致不该保护的路径被保护，或该保护的路径未被保护。
    //                      例如，如果需要保护所有 '/dashboard' 下的子路径，应改为 '/dashboard/:path*'
    matcher: ['/profile/:path*'],
}