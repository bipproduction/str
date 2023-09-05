'use server'

import { prisma } from "@/utils/prisma"

export async function funLoadListFile(userId: any) {
    const data = await prisma.file.findMany({
        where: {
            userId
        }
    })

    return data
}