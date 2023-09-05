'use server'

import { unsealData } from "iron-session";
import _ from "lodash";
import { NextRequest } from "next/server";

export async function funGetAuthorization(req: NextRequest) {
    const h = req.headers.get("Authorization")
    if (!h) return null
    const tkn = h.split(" ").pop()
    if (!tkn) return null
    const t = await unsealData(tkn, { password: process.env.PASSWORD as string })
    if (!t || _.isEmpty(t)) return null
    return t
}