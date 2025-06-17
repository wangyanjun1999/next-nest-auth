import { deleteSession, getSession } from "@/lib/session";
import { get } from "http";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    // [步骤1-🎬 开始] 启动 GET 函数 - 欢迎来到退出登录的“舞台”！
    console.log("[步骤1-🎬 开始] 启动 GET 函数 - 欢迎来到退出登录的“舞台”！");
    // 💡 解释：这个 GET 函数就像一个专门处理“退出登录”请求的“服务员”。当你的浏览器向 `/api/auth/signout` 这个地址发送一个 GET 请求时，它就会被激活。

    // [步骤2-📋 准备] 准备接收来自浏览器的“点菜单” (请求信息)。
    console.log("[步骤2-📋 准备] 准备接收来自浏览器的“点菜单” (请求信息)。");
    // [步骤2-📊 数据] request: 旧值(无) → ${JSON.stringify({ url: request.url, method: request.method, headers: request.headers.get('cookie') ? '包含Cookie' : '不包含Cookie' })} (NextRequest 对象，包含了用户的请求详情，比如请求来自哪个页面、请求方法是什么，以及会话相关的Cookie信息。)
    console.log(`[步骤2-📊 数据] request: 旧值(无) → ${JSON.stringify({ url: request.url, method: request.method, headers: request.headers.get('cookie') ? '包含Cookie' : '不包含Cookie' })} (NextRequest 对象，包含了用户的请求详情，比如请求来自哪个页面、请求方法是什么，以及会话相关的Cookie信息。)`);
    // 💡 解释：\`request\` 对象就像是服务员接过来的顾客的“点菜单”，上面详细记录了顾客（浏览器）想要做什么（退出登录）以及他们的当前位置（URL）。这里特别注意到了请求头中的Cookie，它通常包含着用户的会话信息，是判断用户登录状态的关键。

    // [步骤3-📋 准备] 接下来，最关键的一步是“清除用户会话”，这就像是“销毁”用户的“通行证”。
    console.log("[步骤3-📋 准备] 接下来，最关键的一步是“清除用户会话”，这就像是“销毁”用户的“通行证”。");
    // [步骤3-⚡ 执行] 正在调用 \`deleteSession()\` 函数，输入参数：无。预测：该函数将清除存储在服务器或浏览器中的用户登录状态，返回一个Promise。
    console.log("[步骤3-⚡ 执行] 正在调用 `deleteSession()` 函数，输入参数：无。预测：该函数将清除存储在服务器或浏览器中的用户登录状态，返回一个Promise。");
    // 💡 解释：想象一下，你进入了一个游乐园，拿到了一张通行证。\`deleteSession()\` 的作用就是把这张通行证作废，这样你就不能再凭这张证进入游乐园的任何区域了，也就是“退出登录”。

    // [‼️潜在问题点与风险] 🔍 检查：如果 \`deleteSession\` 过程中出现网络问题、服务器故障，或者会话信息未能正确删除，用户可能会遇到“假性退出”的情况。
    // 🛡️ 防护：为了应对这种情况，我们使用 \`try-catch\` 块来捕获可能发生的错误。
    try {
        await deleteSession(); // 等待会话删除操作完成
        // [步骤3-✅ 完成] \`deleteSession()\` 执行成功，用户的会话信息已成功删除。恭喜，你的“通行证”已经失效！返回值：无（Promise已解决）。
        console.log("[步骤3-✅ 完成] `deleteSession()` 执行成功，用户的会话信息已成功删除。恭喜，你的“通行证”已经失效！返回值：无（Promise已解决）。");
    } catch (error: any) { // 捕获任何可能发生的错误
        // [步骤3-🛡️ 防护] 捕获删除会话时的错误。
        console.error(`[步骤3-🛡️ 防护] 🚨 抱歉，删除会话时发生错误：${error.message}。请检查后端服务或网络连接。`);
        // 💡 解释：就像游乐园的系统故障，导致你的通行证无法正常作废。
        // 🎯 结果：在这种情况下，我们不能直接重定向，而是向用户返回一个错误信息，让他们知道出了什么问题。
        // [步骤3-🎯 结果] 函数即将返回一个包含错误信息的JSON响应，状态码为500。
        console.log("[步骤3-🎯 结果] 函数即将返回一个包含错误信息的JSON响应，状态码为500。");
        return NextResponse.json({ message: "登出失败，请稍后重试。" }, { status: 500 });
    }

    // [步骤4-📋 准备] 用户的“通行证”作废后，我们需要指引他们去往“出口”——也就是网站的主页。
    console.log("[步骤4-📋 准备] 用户的“通行证”作废后，我们需要指引他们去往“出口”——也就是网站的主页。");
    // [步骤4.1-📋 准备] 接下来，为了确保用户看到的是最新的、已登出状态的页面，我们需要清除Next.js的页面缓存。
    console.log("[步骤4.1-📋 准备] 接下来，为了确保用户看到的是最新的、已登出状态的页面，我们需要清除Next.js的页面缓存。");
    // [步骤4.1-⚡ 执行] 正在调用 \`revalidatePath('/')\`。输入参数：'/' (根路径)。预测：这将告诉Next.js在下次请求根路径时重新生成页面，而不是从缓存中获取旧内容。
    console.log("[步骤4.1-⚡ 执行] 正在调用 `revalidatePath('/')`。输入参数：'/' (根路径)。预测：这将告诉Next.js在下次请求根路径时重新生成页面，而不是从缓存中获取旧内容。");
     // 注意是layout
    revalidatePath('/');  
    revalidatePath('/dashboard');  // 仪表板页面
    revalidatePath('/auth');       // 认证相关页面
    revalidatePath('/', 'layout')
    revalidatePath('/', 'page')
    // [步骤4.1-✅ 完成] \`revalidatePath('/')\` 调用完成。根路径的缓存已标记为过期。
    console.log("[步骤4.1-✅ 完成] `revalidatePath('/')` 调用完成。根路径的缓存已标记为过期。");

    // [步骤4.2-📋 准备] 构造重定向目标 URL。
    console.log("[步骤4.2-📋 准备] 构造重定向目标 URL。");
    // [步骤4.2-⚡ 执行] 正在调用 \`new URL()\` 构造重定向 URL。输入参数：'/' (目标路径), request.url (当前请求的完整URL，用于解析相对路径)。
    console.log("[步骤4.2-⚡ 执行] 正在调用 `new URL()` 构造重定向 URL。输入参数：'/' (目标路径), request.url (当前请求的完整URL，用于解析相对路径)。");
    const redirectUrl = new URL('/', request.url);
    // [步骤4.2-📊 数据] redirectUrl: 旧值(无) → ${redirectUrl.toString()} (这是一个 URL 对象，包含了我们想要用户跳转到的新地址。)
    console.log(`[步骤4.2-📊 数据] redirectUrl: 旧值(无) → ${redirectUrl.toString()} (这是一个 URL 对象，包含了我们想要用户跳转到的新地址。)`);
    // 💡 解释：这就像游乐园的工作人员告诉你，你已经完成了离园手续，现在请前往出口处（网站主页）。

    // [步骤5-📋 准备] 准备将用户“送”到新的页面。
    console.log("[步骤5-📋 准备] 准备将用户“送”到新的页面。");
    // [步骤5-⚡ 执行] 正在执行重定向操作，向浏览器发送一个特殊的 HTTP 响应 (状态码 302)。输入参数：redirectUrl (目标URL对象)。预测：浏览器将接收此响应并自动导航到新地址。
    console.log("[步骤5-⚡ 执行] 正在执行重定向操作，向浏览器发送一个特殊的 HTTP 响应 (状态码 302)。输入参数：redirectUrl (目标URL对象)。预测：浏览器将接收此响应并自动导航到新地址。");
    // 💡 解释：\`NextResponse.redirect()\` 就像一个非常智能的交通警察，它会告诉你的浏览器：“嘿，你现在要去这里！” 浏览器接收到这个指令后，就会自动加载并显示新的页面。
    // [步骤5-🎯 结果] 函数即将返回一个重定向响应。用户将被浏览器自动导航到根路径 '/'。至此，整个退出登录的“故事”圆满结束！
    console.log("[步骤5-🎯 结果] 函数即将返回一个重定向响应。用户将被浏览器自动导航到根路径 '/'。至此，整个退出登录的“故事”圆满结束！");

    // 重定向并刷新页面
    return NextResponse.redirect(redirectUrl);
}