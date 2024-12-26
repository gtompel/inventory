import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "./prisma"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),
    emailAndPassword:{
        enabled: true
    },
    session: {
        maxAge: 8 * 60 * 60, // 8 hours
        updateAge: 60 * 60  // update session every 1 hour
    },
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3000/api/auth",
        "http://localhost:3000/auth",
        "http://localhost:3000/api/auth/get-session",
        "http://172.16.6.57:3000/auth",
        "http://172.16.6.57:3000/api/auth",
        "http://172.16.6.57:3000/api/auth/get-session",
        "http://172.16.6.57:3000"
        ]
});