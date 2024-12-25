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
    }
});