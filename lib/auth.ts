import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./prisma"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"

    }),
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true, // предотвращает доступ к cookie через JavaScript
        sameSite: "lax", // ограничивает отправку cookie на кросс-доменные запросы
        path: "/", // определяет путь для доступности cookie
    },
    session: {
        maxAge: 30 * 24 * 60 * 60, // например, 30 дней (в секундах)
        updateAge: 24 * 60 * 60, // обновлять токен за 24 часа
    },
    jwt: {
        secret: process.env.BETTER_AUTH_SECRET as string,

    },

})