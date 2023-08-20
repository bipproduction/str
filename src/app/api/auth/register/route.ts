import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json()
    if (!data) return NextResponse.json({ success: false, message: "no empty data" })

    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    })

    if (user) return NextResponse.json({
        success: false,
        message: "use another email"
    })

    await prisma.user.create({
        data: {
            email: data.email,
            password: data.password,
            name: data.name,
            phone: data.phone
        }
    })

    return NextResponse.json({
        success: true,
        message: "user created"
    })
}