import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'
import _ from 'lodash'
import { prisma } from "@/utils/prisma";
import fileTypes from "@/utils/file_type";
export async function POST(req: any) {

    const alamat = './public/assets/files'
    const form = await req.formData()
    const file = form.get("file")
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // ext , extention
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1);

    if (!_.keys(fileTypes).includes(ext)) return NextResponse.json({
        success: false,
        message: `file tidak didukung ${ext}`
    })


    const dbFile = await prisma.file.create({
        data: {
            name: file.name,
            ext: ext,
            path: alamat
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
    }, {
        status: 201
    })
}