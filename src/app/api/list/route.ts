import { funGetAuthorization } from "@/utils/get_authorization";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0

export async function GET(req: NextRequest) {
    const userId = await funGetAuthorization(req)
    if (!userId) redirect('/auth/login')
    const listData = await prisma.file.findMany({
        where: {
            isActive: true,
            userId: userId
        },
        select: {
            id: true,
            ext: true,
            name: true
        }
    })

    return NextResponse.json(listData)
}