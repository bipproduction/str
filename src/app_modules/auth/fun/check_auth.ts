'use Server'

import { unsealData } from "iron-session"
import _ from "lodash"
import { headers } from "next/headers"

export async function checkAuth() {
    const auth = headers().get('Authorization')
    if (!auth) return null
    const t = auth.replace('Bearer ', '')
    const tkn = await unsealData(t, { password: process.env.PASSWORD as string })
    if (!tkn || _.isEmpty(tkn)) return null
    return tkn
}