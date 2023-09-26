'use client'
import { Button, Center, Loader } from "@mantine/core"
import { useRouter, useSearchParams } from "next/navigation"
import { funDelete } from "./fun/delete"
import { Notify } from "notiflix"
import { useShallowEffect } from "@mantine/hooks"

export default function ViewDelete() {
    const search = useSearchParams().get("id")
    const router = useRouter()

    useShallowEffect(() => {
        onDelete()
    }, [])

    async function onDelete() {
        await new Promise(r => setTimeout(r, 500))
        const apa = await funDelete(search)
        if (!apa) return Notify.failure("gagal")
        Notify.success("berhasil")
        return router.back()
    }
    return <>
        <Center w={"100%"} h={"100vh"}>
            <Loader />
        </Center>
    </>
}