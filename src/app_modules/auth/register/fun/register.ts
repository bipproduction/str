'use server'

import { prisma } from "@/utils/prisma"
import _ from "lodash"

export async function funRegister(data: any) {
    try {
        const d = await prisma.user.findUnique({
            where: {
                email: data.email
            },
            select: {
                active: true
            }
        })

        if (d) return {
            success: false,
            message: "email has taken , register please"
        }

        const r = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })

        return {
            success: true,
            message: "success"
        }
    } catch (error) {
        return {
            success: false,
            message: "connection error" + error
        }
    }

}