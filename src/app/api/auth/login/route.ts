import { prisma } from "@/utils/prisma"
import { sealData } from "iron-session"
import _ from "lodash"
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server"
import 'colors'

export async function POST(req: NextRequest) {
    const { name, password } = await req.json()
    if (!name || !password) return NextResponse.json({
        success: false,
        message: "wrong user name or password"
    })

    const user = await prisma.user.findMany({
        where: {
            AND: {
                name: name,
                password: password
            }
        }
    })

    if (_.isEmpty(user)) return NextResponse.json({
        success: false,
        message: "register"
    })

    try {
        await prisma.auth.upsert({
            where: {
                userId: user[0].id
            },
            create: {
                userId: user[0].id,
            },
            update: {
                isActive: true
            }
        })
    } catch (error) {
        console.log(`${error}`.red)
    }

    const userToken = await sealData(JSON.stringify(user[0]), { password: process.env.PASSWORD as any })
    cookies().set({
        name: "str_token",
        value: userToken,
        path: "/"
    })

    return NextResponse.json({
        success: true,
        message: "success"
    })
}