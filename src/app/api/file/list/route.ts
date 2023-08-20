import { prisma } from "@/utils/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";
import { funUserCookie } from "../../../../../app_modules";
import { redirect } from "next/navigation";

export const revalidate = 0

export async function GET() {
    const usr = await funUserCookie()

    if (!usr) return redirect('/login')

    const listData = await prisma.file.findMany({
        where: {
            isActive: true,
            userId: usr.id
        },
        select: {
            id: true,
            ext: true,
            name: true
        }
    })

    return NextResponse.json(listData)
}