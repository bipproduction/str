import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { unsealData } from "iron-session";
import { prisma } from "@/utils/prisma";
import { funUserCookie } from "../../../../app_modules";

export async function GET() {
    const user = await funUserCookie()

    console.log(user)
    return NextResponse.json({})
}