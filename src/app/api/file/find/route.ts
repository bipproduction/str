import { prisma } from "@/utils/prisma";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0

export async function GET(req: NextRequest) {
    const name = req.nextUrl.searchParams.get("name")
    const data = await prisma.file.findMany({
        where: {
            name: {
                contains: name!,

            },
            isActive: true
        },
        select: {
            id: true,
            name: true,
            ext: true
        }
    })

    return NextResponse.json(_.map(data, (v) => v.id))
}