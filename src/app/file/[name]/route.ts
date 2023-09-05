import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'
import { prisma } from "@/utils/prisma";
import sharp from "sharp";
import fileTypes from "@/utils/file_type";
import path from 'path'

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {

    const def = fs.readFileSync(`${process.env.FILE_PATH}/default/no-file.png`)
    const name = params.name.split(".")
    const id = name.shift()
    const ext = path.extname(params.name).replace(".", '')
    const w = (new URL(req.url).searchParams.get("w")) ?? null
    const mimType = (fileTypes.find((v) => v.extension === ext)?.mimeType) ?? null

    // cek mime typenya
    if (!mimType) return new NextResponse(def, {
        headers: {
            "Content-type": "image/png"
        }
    })

    const cek = await prisma.file.findUnique({
        where: {
            id: id
        }
    })

    if (!cek || !cek.isActive) return new NextResponse(def, {
        headers: {
            "Content-type": "image/png"
        }
    })

    try {
        const file = fs.readFileSync(`${process.env.FILE_PATH}/${id}.${ext}`)
        if (w && (ext === "png" || ext === "jpg")) {
            const fw = await sharp(file).resize(+w).toBuffer()
            return new NextResponse(fw, {
                headers: {
                    "Content-Type": mimType
                }
            })
        }

        return new NextResponse(file, {
            headers: {
                "Content-Type": mimType
            }
        })
    } catch (error) {
        return new NextResponse(def, {
            headers: {
                "Content-type": "image/png"
            }
        })
    }

}