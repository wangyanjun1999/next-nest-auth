import { redirect } from "next/navigation";
import { FormState, SigninFormSchema, SignupFormSchema } from "./type";
import { BACKEND_URL } from "./constants";


export async function signUp(state: FormState,formData: FormData): Promise<FormState> {
    // [步骤1-🎬 开始] 启动用户注册流程 signUp - 就像新用户在网站上填写注册表格。
    // [💡 解释] 这个函数就像网站的注册台，它负责接收你提交的注册信息，并进行初步的检查，确保这些信息是有效的、可以被系统接受。
    console.log("[步骤1-📋 准备] 准备接收用户提交的注册表单数据。");
    // [步骤1-📊 数据] state: null/undefined/{} → " + JSON.stringify(state) + " (FormState 对象) - 包含了上次操作的结果或错误信息。
    // [💡 解释] 想象一下 `state` 就像一个“反馈板”，它会显示你上次尝试注册时是否有错误，或者操作是否成功。在函数开始时，它通常是空的或者带有上一次操作的反馈。
    console.log(`[步骤1-📊 数据] formData: (原始) → ${JSON.stringify(Object.fromEntries(formData.entries()))} (FormData 对象) - 就像你手写的注册表单，里面包含了姓名、邮箱和密码等即将提交的信息。`);
    // [💡 解释] `formData` 就像你填好并递交的纸质表格，里面包含了所有你需要提交给服务器的注册细节。

    // [步骤2-📋 准备] 准备验证用户输入的数据。
    // [💡 解释] 就像海关检查旅客的护照一样，我们要在这里对用户提交的数据进行严格检查。这一步是为了确保数据的格式是正确的，防止“无效信息”进入系统，从而保护系统的稳定性和安全性。
    console.log("[步骤2-⚡ 执行] 正在使用 Zod 模式 `SignupFormSchema` 对表单数据进行结构化验证。");
    // [💡 解释] `SignupFormSchema` 就像一张官方的“数据格式要求单”，它规定了姓名、邮箱和密码应该是什么样子（例如，邮箱必须包含“@”符号，密码必须达到一定长度等）。只有符合这些要求的数据才能通过验证。
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });
    console.log(`[步骤2-📊 数据] 验证输入: { name: "${formData.get("name")}", email: "${formData.get("email")}", password: "********" } (对象) - 我们将这些从表单中获取的值传递给 Zod 验证器进行检查。注意：密码在这里以星号显示，以保护隐私。`);
    console.log(`[步骤2-🎯 结果] validatedFields: (原始) → ${JSON.stringify(validatedFields)} (ZodParseResult 对象) - 这是验证操作的最终结果。如果 'success' 属性为 true，表示数据格式完全符合预期；如果为 false，则表示存在错误。`);

    // [步骤3-🤔 判断] 判断验证是否成功：`validatedFields.success` 是 ${validatedFields.success}。
    // [💡 解释] 这是一个关键的“检查点”，它决定了程序接下来是继续处理有效数据，还是返回错误信息让用户修正。如果验证失败，就像你填写的表格不符合要求，无法进入下一步，必须重新填写。
    if (!validatedFields.success) {
        // [步骤3-🛡️ 防护] 验证失败！数据不符合要求，就像你的护照信息不对，无法通过海关。
        console.log("[步骤3-⚡ 执行] 正在从验证结果中提取详细的字段错误信息。");
        // [💡 解释] `fieldErrors` 会非常清楚地指出具体是哪个输入字段出了问题，以及问题的原因（例如，“邮箱格式不正确”或“密码太短”）。这些信息对用户修正错误至关重要。
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        console.log(`[步骤3-📊 数据] fieldErrors: (原始) → ${JSON.stringify(fieldErrors)} (对象) - 告诉你具体哪个字段出了什么问题（例如：email: ["Invalid email"]）。`);
        console.log("[步骤3-🎯 结果] 函数返回一个包含具体错误信息的 `FormState` 对象给调用者。前端应用会根据这些信息向用户显示友好的错误提示。");
        console.log(`[‼️潜在问题点与风险] 确保前端能够清晰、准确地向用户展示这些错误信息，以便用户修正。同时，需要考虑错误信息的国际化，以支持不同语言的用户。`);
        return {
            error: fieldErrors,
        };
    }

    // [步骤4-✅ 完成] 恭喜，数据验证通过，所有信息都填写正确！
    // [💡 解释] 就像你填写的表格通过了海关检查，现在可以安全地进入下一个环节，将数据发送到服务器了。
    console.log("[步骤4-📋 准备] 准备将经过前端验证的干净数据发送到后端API。");
    console.log(`[步骤4-📊 数据] validatedFields.data: (原始) → ${JSON.stringify(validatedFields.data)} (对象) - 这就是我们可以信任并发送给服务器的用户注册数据。请注意，为了安全，密码在这里通常已经被哈希处理或不会直接显示。`);
    console.log(`[步骤4-📊 数据] 后端API基础URL (BACKEND_URL): "${BACKEND_URL}" (字符串) - 这是我们后端服务器的地址，就像你知道包裹要寄到哪里一样。`);
    console.log(`[步骤4-📋 准备] 接下来会向后端API发送用户注册请求到: ${BACKEND_URL}/auth/signup。`);
    // [💡 解释] 这就像我们要把一份完整的注册申请表（电子版）发送给服务器，让服务器来创建新用户账户。

    // [步骤5-⚡ 执行] 正在使用 `fetch` API 向指定的后端注册接口发送 POST 请求。
    // [💡 解释] 这就像你通过网络“快递”了一封包含你注册信息的信件给服务器。这封信件的目的是告诉服务器：“我想注册一个新账户，这是我的信息！”
    const response: Response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST", // [💡 解释] `POST` 方法表示我们要向服务器“提交”新的数据，而不是获取数据。
        headers: {
            "Content-Type": "application/json",
            // [💡 解释] `Content-Type: application/json` 就像在信封上写明“内含JSON格式文件”，告诉服务器如何正确解读信件内容。
        },
        body: JSON.stringify(validatedFields.data),
        // [💡 解释] `JSON.stringify(validatedFields.data)` 就像把你的表格信息转换成统一的电子格式（JSON字符串），以便在网络中高效、安全地传输。
    });
    console.log(`[步骤5-🎯 结果] response: (原始) → ${response} (Response 对象) - 这是服务器回复给你的“快递包裹”。它包含了服务器对你注册请求的处理结果，例如注册是否成功、失败原因等。`);
    console.log(`[‼️潜在问题点与风险] 网络请求可能因为多种原因失败（例如：用户的网络断开、后端服务器暂时无响应、DNS解析错误等）。为了提供更好的用户体验，可以考虑添加请求超时机制和重试逻辑。`);


    // [步骤6-🤔 判断] 检查HTTP响应状态码：`response.ok` 是 ${response.ok}。
    // [💡 解释] `response.ok` 就像服务器给你的一个“已收到并处理成功”的印章。如果 `response.ok` 为 `true`，意味着服务器成功处理了请求（HTTP状态码在200-299之间）；如果为 `false`，则表示请求未能成功处理。
    if (!response.ok) {
        // [步骤7-🛡️ 防护] 后端注册请求失败了！服务器没有接受我们的注册。
        // [💡 解释] 这就像你寄出的注册信被退了回来，信上写着“原因：信息有误”或“收件人不在”（服务器返回了错误）。
        console.error(`[步骤7-📊 数据] HTTP状态码: ${response.status} (数字) - 这是服务器返回的错误代码，如 409（冲突）。`);
        console.error(`[步骤7-📊 数据] 状态文本: ${response.statusText} (字符串) - 这是错误代码的简短描述。`);
        console.error(`[步骤7-⚡ 执行] 正在根据后端返回的状态码判断具体的错误类型。`);
        // [💡 解释] 状态码 409 (Conflict) 通常表示“冲突”，在这种情况下最常见的原因是用户尝试注册的邮箱已经被其他用户使用了。
        console.error(`[步骤7-🤔 判断] 判断失败原因：如果状态码是 409 (冲突)，意味着邮箱可能已经被注册。`);
        console.log("[步骤7-🎯 结果] 函数返回一个包含错误消息的对象，前端将显示此错误信息，告知用户注册失败的原因。");
        console.log(`[‼️潜在问题点与风险] 错误消息应该足够具体，帮助用户理解问题并采取行动（例如“邮箱已存在，请尝试登录”）。同时，在生产环境中应避免暴露过多的后端错误细节，以防潜在的安全风险。`);
        return {
            message: response.status === 409 ? "Email already exists" : ` Failed to signup: ${response.statusText}`,
        };
    }

    // [步骤8-✅ 完成] 注册成功！服务器接受了你的注册信息，并为你创建了账户。
    // [💡 解释] 就像你成功办理了会员卡，现在可以去享受服务了。
    console.log("[步骤8-📋 准备] 注册成功后，接下来会将用户重定向到登录页面。");
    // [💡 解释] 注册成功后自动跳转到登录页，这是一个常见的用户体验模式，就像你办完会员卡后，前台引导你去会员专属区域一样，方便用户立即体验新账户。
    console.log("[步骤8-⚡ 执行] 正在调用 `redirect(\"/auth/signin\")` 函数进行页面跳转。");
    redirect("/auth/signin"); // [结果] 调用 Next.js 的 `redirect` 函数进行页面跳转。
    // [步骤9-🎯 结果] 用户已被重定向到 `/auth/signin` 登录页面。
    // [‼️潜在问题点与风险] `redirect` 函数会中断当前函数的执行，这意味着 `redirect` 后的任何代码都不会被执行。在设计流程时，需要确保在 `redirect` 之前完成了所有必要的逻辑处理。
}


export async function signIn(state: FormState,formData: FormData): Promise<FormState> {
   // [步骤1-🎬 开始] 启动用户登录流程 signIn - 就像你用已有的账户登录网站。
   // [💡 解释] 这个函数就像网站的登录入口，它的核心任务是验证你的身份，只有通过验证，你才能进入系统访问受保护的资源。
   console.log("[步骤1-📋 准备] 准备接收用户提交的登录凭据（邮箱和密码）。");
   console.log(`[步骤1-📊 数据] state: null/undefined/{} → ${JSON.stringify(state)} (FormState 对象) - 包含了上次操作的结果或错误信息。`);
   console.log(`[步骤1-📊 数据] formData: (原始) → ${JSON.stringify(Object.fromEntries(formData.entries()))} (FormData 对象) - 包含了你输入的邮箱和密码，就像你登录时填写的表单。`);
   // [💡 解释] `formData` 包含了用户在登录表单中输入的邮箱和密码，这些信息将被用来验证用户身份。
   
   // [步骤2-📋 准备] 准备验证你输入的登录凭据。
   // [💡 解释] 就像你在输入密码开门前，系统会先检查你的密码格式是否符合要求（例如，密码长度、是否包含特殊字符等）。这是为了确保数据在发送到服务器之前就是有效的，减少不必要的网络请求。
   console.log("[步骤2-⚡ 执行] 正在使用 Zod 模式 `SigninFormSchema` 对表单数据进行结构化验证。");
   // [💡 解释] `SigninFormSchema` 就像一个“登录信息格式检查员”，它确保你输入的邮箱和密码在格式上是正确的，例如，邮箱必须是合法的邮箱地址格式。
    const validatedFields = SigninFormSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });
    console.log(`[步骤2-📊 数据] 验证输入: { email: "${formData.get("email")}", password: "********" } (对象) - 这些是我们将要验证的输入值。出于安全考虑，密码在这里以星号表示。`);
    console.log(`[步骤2-🎯 结果] validatedFields: (原始) → ${JSON.stringify(validatedFields)} (ZodParseResult 对象) - 这是验证操作的最终结果。如果 'success' 为 true，则表示格式正确。`);

    // [步骤3-🤔 判断] 判断验证是否成功：`validatedFields.success` 是 ${validatedFields.success}。
    // [💡 解释] 这个判断决定了我们是否能继续下一步的登录尝试。如果验证失败，就像门卫发现你的入场券格式不对，你就无法进入。
    if (!validatedFields.success) {
        // [步骤3-🛡️ 防护] 验证失败！登录凭据格式不正确。
        // [💡 解释] 这通常是因为用户输入的邮箱或密码格式不符合前端定义的规则（例如，邮箱没有@符号，或者密码不符合最小长度要求）。
        console.log("[步骤3-⚡ 执行] 正在提取详细的字段错误信息。");
        const fieldErrors = validatedFields.error.flatten().fieldErrors;
        console.log(`[步骤3-📊 数据] fieldErrors: (原始) → ${JSON.stringify(fieldErrors)} (对象) - 详细说明哪个字段有问题，例如：email: ["Invalid email format"]。`);
        console.log("[步骤3-🎯 结果] 函数返回一个包含错误信息的对象，前端将提示用户修正这些格式问题。");
        console.log(`[‼️潜在问题点与风险] 确保前端对登录错误提供清晰、具体的反馈，避免用户混淆。例如，区分“格式错误”和“账号密码不匹配”有助于用户快速定位问题。`);
        return {
            error: fieldErrors,
        };
    }
    
    // [步骤4-✅ 完成] 凭据格式验证通过，数据格式正确。
    // [💡 解释] 你的登录信息格式正确，现在可以尝试用它来真正登录了，就像你的入场券通过了初步检查。
    console.log("[步骤4-📋 准备] 准备将经过前端验证的登录数据发送到后端进行身份验证。");
    console.log(`[步骤4-📊 数据] validatedFields.data: (原始) → ${JSON.stringify(validatedFields.data)} (对象) - 这就是我们将要发送给服务器的登录凭据（邮箱和密码）。`);
    console.log(`[步骤4-📊 数据] 后端API基础URL (BACKEND_URL): "${BACKEND_URL}" (字符串) - 再次确认后端服务器的地址。`);
    console.log(`[步骤4-📋 准备] 接下来会向后端API发送用户登录请求到: ${BACKEND_URL}/auth/signin。`);
    // [💡 解释] 这一步是向服务器发送实际的登录请求，服务器会根据这些凭据来验证你的身份。

    // [步骤5-⚡ 执行] 正在使用 `fetch` API 向后端登录接口发送 POST 请求。
    // [💡 解释] 这就像你把钥匙插进锁孔，尝试打开一扇门。我们发送你的登录信息给服务器，看看它能否“解锁”你的账户。
    const response: Response = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: "POST", // [💡 解释] 同样，`POST` 方法表示我们要向服务器“提交”数据以进行登录。
        headers: {
            "Content-Type": "application/json",
            // [💡 解释] 告诉服务器我们发送的是JSON格式的数据。
        },
        body: JSON.stringify(validatedFields.data),
        // [💡 解释] 将登录凭据转换为JSON字符串作为请求体，这是网络传输的标准格式。
    });
    console.log(`[步骤5-🎯 结果] response: (原始) → ${response} (Response 对象) - 这是服务器对你登录尝试的回应。它包含了登录是否成功、是否需要重定向等信息。`);
    console.log(`[‼️潜在问题点与风险] 注意处理网络延迟和服务器响应慢的情况，可以在用户界面上显示加载状态或动画，避免重复提交，提升用户体验。`);

    // [步骤6-🤔 判断] 检查HTTP响应状态码：`response.ok` 是 ${response.ok}。
    // [💡 解释] `response.ok` 就像服务器给你的“登录成功”或“登录失败”的反馈。如果 `response.ok` 为 `true`，表示服务器认为登录凭据是有效的。
    if (!response.ok) {
        // [步骤7-🛡️ 防护] 后端登录请求失败了！服务器拒绝了登录。
        // [💡 解释] 这就像你的钥匙不对，门打不开。服务器告诉你，你提供的邮箱或密码是不正确的。
        console.error(`[步骤7-📊 数据] HTTP状态码: ${response.status} (数字) - 这是服务器返回的错误代码，如 401（未授权）。`);
        console.error(`[步骤7-📊 数据] 状态文本: ${response.statusText} (字符串) - 这是错误代码的简短描述。`);
        console.error(`[步骤7-⚡ 执行] 正在根据后端返回的状态码判断具体的错误类型。`);
        // [💡 解释] 状态码 401 (Unauthorized) 通常表示“未授权”，即你提供的邮箱或密码不正确，服务器无法验证你的身份。
        console.error(`[步骤7-🤔 判断] 判断失败原因：如果状态码是 401 (未授权)，意味着邮箱或密码不正确。`);
        console.log("[步骤7-🎯 结果] 函数返回一个包含错误消息的对象，前端将显示登录失败信息，如“无效的邮箱或密码”。");
        console.log(`[‼️潜在问题点与风险] 避免在前端直接暴露过于详细的后端错误信息，以免被恶意利用。对用户来说，一个泛泛的“无效凭据”错误比详细的内部错误信息更安全。`);
        return {
            message: response.status === 401 ? "Invalid email or password" : ` Failed to signin: ${response.statusText}`,
        };
    }
    
    // [步骤8-✅ 完成] 登录成功！服务器验证了你的身份。
    // [💡 解释] 你的钥匙打开了门，现在可以进入系统了。服务器已经确认你是合法的用户。
    console.log("[步骤8-⚡ 执行] 正在解析后端返回的JSON数据。");
    // [💡 解释] 这就像你在打开门后，拿到了进入房间的通行证（access token）和你的身份信息。这些信息通常是认证令牌和用户基本信息，用于后续的身份验证和授权。
    const result = await response.json();
    console.log(`[步骤8-📊 数据] result: (原始) → ${JSON.stringify(result)} (对象) - 包含了会话或用户信息，例如认证令牌（通常是JWT）和用户ID等。`);

    // [步骤8-📋 准备] 【TODO】 接下来需要为认证用户创建会话。
    // [💡 解释] 创建会话就像你在一个俱乐部里办理了会员卡。一旦有了会员卡，你就不需要每次都出示身份证了，直接刷卡即可进入。在Web应用中，这意味着存储认证令牌（如JWT）到客户端，以便用户在后续请求中保持登录状态。
    console.log("[步骤8-💡 解释] 此处是一个待完成的任务，用于在前端为认证用户创建用户会话。这是保持用户登录状态的关键步骤，通常涉及将服务器返回的认证令牌（如JWT）存储在客户端（例如使用HTTP Only Cookie 或 Web Storage）。");
    console.log(`[‼️潜在问题点与风险] 会话管理需要高度重视安全性，例如使用 HTTP Only Cookies 存储敏感令牌（可以防止XSS攻击），定期刷新令牌以减少被盗用的风险，并设置合理的令牌过期时间以防止会话劫持。`);
    
    // [步骤9-🎯 结果] 登录流程结束，函数返回一个表示登录成功的消息。
    console.log("[步骤9-✅ 完成] 用户登录流程成功完成。");
    return {
        message: "Signin successful",
    };
}