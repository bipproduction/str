'use client'
import { useRouter } from "next/navigation"
import { funLogout } from "../.."
import toast from "react-simple-toasts"
import { Button, Group, Stack } from "@mantine/core"

export default function ViewLogout() {
    const router = useRouter()
    return <Group p={"md"} position="right">
        <Button compact onClick={async () => {
            const isLogout = await funLogout()
            if (!isLogout.success) return toast("gagal")
            router.push('/')
        }}>LOGOUT</Button>
    </Group>
}