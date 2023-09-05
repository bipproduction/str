import fileTypes from "@/utils/file_type";
import { prisma } from "@/utils/prisma";
import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";
import sharp from 'sharp';

export const revalidate = 0

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    if (!params.id) return NextResponse.json({
        success: false,
        message: "empty param"
    })

    const fileId = params.id
    const ext = fileId.substring(fileId.lastIndexOf('.') + 1);
    const dir = "./public/assets"
    const nama = fileId.slice(0, fileId.lastIndexOf('.'));

    const width = req.nextUrl.searchParams.get('w')
    const fileDb = await prisma.file.findUnique({
        where: {
            id: nama,
        }
    })

    if (!fileDb || !fileDb.isActive) {
        console.log("gak ketemu di db")
        const file = fs.readFileSync(`${dir}/default/no_image.png`)
        return new NextResponse(file, {
            headers: {
                "Content-Type": "image/png"
            }
        })
    }

    const ada = fs.existsSync(`${dir}/${ext}/${fileId}`)
    if (!ada) {
        console.log("gak ketemu di dir")
        const file = fs.readFileSync(`${dir}/default/no_image.png`)
        return new NextResponse(file, {
            headers: {
                "Content-Type": "image/png"
            }
        })
    }

    if (width) {
        const img = await sharp(`${dir}/${ext}/${fileId}`).resize(+width).toBuffer()
        const mime = fileTypes.find((v) => v.extension === ext)!.mimeType
        return new NextResponse(img, {
            headers: {
                "Content-Type": mime
            }
        })
    }


    const file = fs.readFileSync(`${dir}/${ext}/${fileId}`)
    const mime = fileTypes.find((v) => v.extension === ext)!.mimeType

    if (!mime) return new NextResponse("file tidak didukung")

    return new NextResponse(file, {
        headers: {
            "Content-Type": mime
        }
    })
}