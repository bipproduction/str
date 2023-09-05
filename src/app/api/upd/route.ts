import { checkAuth } from "@/app_modules/auth/fun/check_auth"
import fileTypes from "@/utils/file_type"
import { prisma } from "@/utils/prisma"
import _ from "lodash"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import fs from 'fs'

export async function POST(req: any, { params }: { params: { id: string } }) {
    if (!params.id) return NextResponse.json({
        success: false,
        message: "empty id"
    })

    const userId = await checkAuth()
    if (!userId) return redirect('/login')

    const alamat = './public/assets'
    const form = await req.formData()
    const file = form.get("file")

    if (!file) return NextResponse.json({
        success: false,
        message: "no  file"
    })

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const ext = file.name.substring(file.name.lastIndexOf('.') + 1);

    if (!_.keys(fileTypes).includes(ext)) return NextResponse.json({
        success: false,
        message: `file tidak didukung ${ext}`
    }, { status: 415 })

    const dbFile = await prisma.file.update({
        where: {
            id: params.id
        },
        data: {
            name: file.name
        }
    })

    if (!fs.existsSync(`${alamat}/${ext}`)) {
        await new Promise((a, b) => {
            fs.mkdirSync(`${alamat}/${ext}`)
            console.log(`dir dibuat ${ext}`)
            a(true)
        })
    }

    fs.writeFileSync(`${alamat}/${ext}/${dbFile.id}.${ext}`, fileBuffer)

    return NextResponse.json({
        success: true,
        message: "success",
        data: dbFile
    })
}