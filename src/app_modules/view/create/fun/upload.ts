'use server'
import fileTypes from '@/utils/file_type'
import { prisma } from '@/utils/prisma'
import path from 'path'
import fs from 'fs'
export async function funUpload(data: any, user: any) {
    const file = data.get('file')
    const name = file.name
    const ext = path.extname(name).replace('.', '')
    const isExt = (fileTypes.find((v) => v.extension === ext)?.extension) ?? null

    if (!isExt) return null

    if (!file) return null
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const dbFile = await prisma.file.create({
        data: {
            name: name,
            ext: ext,
            userId: user
        },
        select: {
            id: true,
            name: true,
            ext: true,
        }
    })

    fs.writeFileSync(`./public/assets/${dbFile.id}.${ext}`, fileBuffer)

    return dbFile
}