import { funGetAuthorization } from "@/utils/get_authorization"
import { prisma } from "@/utils/prisma"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'

export async function DELETE(req: NextRequest) {
    const userId = await funGetAuthorization(req)
    if (!userId) return redirect('/login')

    const filePath = process.env.FILE_PATH
    const fileId = new URL(req.url).searchParams.get('id')
    if (!fileId) return NextResponse.json({
        success: false,
        message: "no file id"
    })

    const fileDb = await prisma.file.delete({
        where: {
            id: fileId
        }
    })

    fs.unlinkSync(`${filePath}/${fileDb.id}.${fileDb.ext}`)
    return NextResponse.json({
        success: true,
        message: "success"
    })
}