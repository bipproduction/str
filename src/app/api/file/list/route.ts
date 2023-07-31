import { prisma } from "@/utils/prisma";
import _ from "lodash";
import { NextResponse } from "next/server";

export async function GET() {
    const listData = await prisma.file.findMany({
        select: {
            id: true
        }
    })
    return NextResponse.json(_.map(listData, (v) => v.id))
}