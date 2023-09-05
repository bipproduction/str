import fileTypes from "@/utils/file_type";
import { funGetAuthorization } from "@/utils/get_authorization";
import { prisma } from "@/utils/prisma";
import fs from 'fs';
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import path from 'path'

export async function POST(req: NextRequest) {

    const userId = await funGetAuthorization(req)
    if (!userId) return redirect('/login')

    const alamat = './public/assets'
    const form = await req.formData()
    const file: any = form.get("file")
    const name = file.name
    const ext = path.extname(name).replace('.', '')
    const isExt = (fileTypes.find((v) => v.extension === ext)?.extension) ?? null

    if (!isExt) return NextResponse.json({
        success: false,
        message: "file tidak didukung"
    })

    if (!file) return NextResponse.json({
        success: false,
        message: "no file"
    })

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const dbFile = await prisma.file.create({
        data: {
            name: name,
            ext: ext,
            userId: userId as any
        },
        select: {
            id: true,
            name: true,
            ext: true,
        }
    })

    fs.writeFileSync(`${alamat}/${dbFile.id}.${ext}`, fileBuffer)
    return NextResponse.json({
        success: true,
        message: "success",
        data: dbFile
    })
}