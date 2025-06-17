import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

// 工厂函数

export const jwtConfig = registerAs('jwt', (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
}))
