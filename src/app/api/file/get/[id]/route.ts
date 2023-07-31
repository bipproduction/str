import fileTypes from "@/utils/file_type";
import { prisma } from "@/utils/prisma";
import fs from 'fs';
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

    const fileId = params.id
    const ext = fileId.substring(fileId.lastIndexOf('.') + 1);
    const dir = "./public/assets/files"
    const nama = fileId.slice(0, fileId.lastIndexOf('.'));

    const fileDb = await prisma.file.findUnique({
        where: {
            id: nama,
        }
    })

    console.log(fileDb)

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

    const file = fs.readFileSync(`${dir}/${ext}/${fileId}`)
    const mime = fileTypes[ext].mimeType

    if (!mime) return new NextResponse("file tidak didukung")

    return new NextResponse(file, {
        headers: {
            "Content-Type": mime
        }
    })
}