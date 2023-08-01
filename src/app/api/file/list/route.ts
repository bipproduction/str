import { prisma } from "@/utils/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";

export const revalidate = 0

export async function GET() {
    const listData = await prisma.file.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            ext: true
        }
    })

    console.log(listData)
    return NextResponse.json(listData.map((v) => `${v.id}.${v.ext}`))
}