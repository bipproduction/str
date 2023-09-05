'use server'
import { cookies } from 'next/headers'
export async function funLogout() {
    cookies().set({
        name: "token",
        value: ""
    })
    return {
        success: true,
        message: "success"
    }
}