'use server'

import { prisma } from "@/utils/prisma"

export async function funList(userId: any) {
    const data = await prisma.file.findMany({
        where: {
            userId,
            isActive: true
        }
    })

    return data
}