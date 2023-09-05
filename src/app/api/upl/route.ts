import { checkAuth } from "@/app_modules/auth/fun/check_auth";
import fileTypes from "@/utils/file_type";
import { funGetAuthorization } from "@/utils/get_authorization";
import { prisma } from "@/utils/prisma";
import fs from 'fs';
import _ from 'lodash';
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function POST(req: any) {

    const userId = await funGetAuthorization(req)
    if (!userId) return redirect('/login')

    const alamat = './public/assets'
    const form = await req.formData()
    const file = form.get("file")

    if (!file) return NextResponse.json({
        success: false,
        message: "no file"
    })

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const ext = file.name.substring(file.name.lastIndexOf('.') + 1);

    if (!_.keys(fileTypes).includes(ext)) return NextResponse.json({
        success: false,
        message: `file tidak didukung ${ext}`
    }, { status: 415, headers })


    const dbFile = await prisma.file.create({
        data: {
            name: file.name,
            ext: ext,
            userId: userId as any
        },
        select: {
            id: true,
            name: true,
            ext: true,
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

    console.log("upload file", JSON.stringify(dbFile))
    return NextResponse.json({
        success: true,
        message: "success",
        data: dbFile
    }, { headers })
}