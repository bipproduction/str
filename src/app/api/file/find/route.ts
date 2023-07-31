import { prisma } from "@/utils/prisma";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const name = req.nextUrl.searchParams.get("name")
    const data = await prisma.file.findMany({
        where: {
            name: {
                contains: name!
            }
        },
        select: {
            id: true
        }
    })

    return NextResponse.json(_.map(data, (v) => v.id))
}