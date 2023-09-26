'use server'
import { prisma } from "@/utils/prisma";

export async function funDelete(id: any) {
    try {
        await prisma.file.update({
            where: {
                id
            },
            data: {
                isActive: false
            }
        })

        return true
    } catch (error) {
        console.log(error)
        return false
    }
}