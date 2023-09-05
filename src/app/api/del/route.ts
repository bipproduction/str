import { checkAuth } from "@/app_modules/auth/fun/check_auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0

export async function DELETE(req: NextRequest) {
    const userId = req.headers.get('_tkn')

    if (!userId) return redirect('/auth/login')

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