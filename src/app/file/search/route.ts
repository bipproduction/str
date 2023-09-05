import { funGetAuthorization } from "@/utils/get_authorization";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = await funGetAuthorization(req)
    if (!userId) return redirect('/login')

    const name = new URL(req.url).searchParams.get('name')
    if (!name) return NextResponse.json({
        success: false,
        message: "no name"
    })

    const listFile = await prisma.file.findMany({
        where: {
            userId: userId,
            name: {
                contains: name
            },
        },
        select: {
            id: true,
            name: true,
            ext: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return NextResponse.json(listFile)


}