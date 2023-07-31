import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id")
    const data = await prisma.file.findUnique({
        where: {
            id: id!
        }
    })

    if (!data) return NextResponse.json({
        success: false,
        message: 'File not found'
    })

    await prisma.file.update({
        where: {
            id: data.id
        },
        data: {
            isActive: false
        }
    })

    return NextResponse.json({
        success: true,
        message: "berhasil"
    })
}