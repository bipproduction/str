'use server'

import { unsealData } from "iron-session"
import _ from "lodash"
import { cookies } from "next/headers"

export async function funGetUser() {
    const token = cookies().get('token')
    if (!token || !token.value || _.isEmpty(token.value)) return null
    const usrId = await unsealData(token.value, { password: process.env.PASSWORD as string })
    if (!usrId || _.isEmpty(usrId)) return null
    return {
        token: token.value,
        id: usrId
    }
}