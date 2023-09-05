import { checkAuth } from "@/app_modules/auth/fun/check_auth";
import { prisma } from "@/utils/prisma";
import _ from "lodash";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0

export async function GET(req: NextRequest) {
    const userId = await checkAuth()
    if (!userId) return redirect('/auth/login')
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