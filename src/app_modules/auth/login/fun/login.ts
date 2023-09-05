'use server'

import { prisma } from "@/utils/prisma"
import { sealData } from "iron-session"
import { cookies } from "next/headers"

export async function funLogin(data: any) {
    const { email, password } = data

    if (!email || !password) return {
        success: false,
        message: "wrong email or password"
    }

    const usr = await prisma.user.findUnique({ where: { email: email } })

    if (password !== usr?.password) return {
        success: false,
        message: "wrong password or email"
    }

    const token = await sealData(usr?.id, { password: process.env.PASSWORD as any })

    cookies().set({
        name: "token",
        value: token
    })

    return {
        success: true,
        message: "success"
    }
}