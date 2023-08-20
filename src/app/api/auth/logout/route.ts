import { NextResponse } from "next/server";
import { funCheckCookie } from "../../../../../app_modules/bin/check_cookie";
import { prisma } from "@/utils/prisma";
import { cookies } from 'next/headers'

export async function GET() {
    const user = await funCheckCookie()

    if (!user) return NextResponse.json({
        success: false,
        message: "has logout | no user"
    })
    await prisma.auth.update({
        where: {
            userId: user?.id
        },
        data: {
            isActive: false
        }
    })

    cookies().set({
        name: "str_token",
        value: "",
        path: "",
        maxAge: 0
    })

    return NextResponse.json({
        success: true,
        message: "logout"
    })
}