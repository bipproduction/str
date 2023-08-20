import fs from 'fs';
import { NextResponse } from "next/server";
import { funUserCookie } from "../../../app_modules";

export async function GET() {
    await funUserCookie()
    const fl = fs.readFileSync('./INFO.md')
    return new NextResponse(fl, {
        headers: {
            "Content-Type": "text"
        }
    })
}