import { prisma } from "@/utils/prisma";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { funUserCookie } from "../../../../../app_modules";

export const revalidate = 0

export async function GET(req: NextRequest) {
    await funUserCookie()
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

    return NextResponse.json(data)
}