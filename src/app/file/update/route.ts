import fileTypes from "@/utils/file_type";
import { funGetAuthorization } from "@/utils/get_authorization";
import { prisma } from "@/utils/prisma";
import fs from 'fs';
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
    const userId = await funGetAuthorization(req)
    if (!userId) return redirect('/login')

    const fileId = new URL(req.url).searchParams.get('id')
    const alamat = process.env.FILE_PATH
    const form = await req.formData()
    const file: any = form.get("file")
    const name: string = file.name
    // const id = name.split(".").shift()
    const ext = path.extname(name).replace('.', '')
    const isExt = (fileTypes.find((v) => v.extension === ext)?.extension) ?? null

    if (!fileId) return NextResponse.json({
        success: false,
        message: "no file id"
    })

    if (!isExt) return NextResponse.json({
        success: false,
        message: "file tidak didukung"
    })

    if (!file) return NextResponse.json({
        success: false,
        message: "no file"
    })

    const cek = await prisma.file.findUnique({ where: { id: fileId } })
    if (!cek) return NextResponse.json({
        success: false,
        message: "no file"
    })

    const dbFile = await prisma.file.update({
        where: {
            id: fileId
        },
        data: {
            name: name,
            ext: ext
        }
    })

    try {
        fs.unlinkSync(`${alamat}/${dbFile.id}.${cek.ext}`)
    } catch (error) {
        console.log("No File")
    }
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(`${alamat}/${dbFile.id}.${ext}`, fileBuffer)
    return NextResponse.json({
        success: true,
        message: "success"
    })
}