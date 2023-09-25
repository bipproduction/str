import { funGetAuthorization } from "@/utils/get_authorization";
import { prisma } from "@/utils/prisma";
import _ from "lodash";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = await funGetAuthorization(req)
    if (!userId) return redirect('/auth/login')

    let skip = new URL(req.url).searchParams.get('skip')
    let take = new URL(req.url).searchParams.get('take')

    if (skip && take) {
        if (!_.isNumber(skip) || !_.isNumber(take)) {
            skip = "0"
            take = "10"
        }

        const listFile = await prisma.file.findMany({
            skip: +skip,
            take: +take,
            where: {
                userId: userId,
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

    const listFile = await prisma.file.findMany({
        where: {
            userId: userId,
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