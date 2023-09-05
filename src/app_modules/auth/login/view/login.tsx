'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-simple-toasts"
import { funLogin } from "../.."
import { Button, Center, Stack, TextInput, Title, UnstyledButton } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"

// export const dynamic = "force-dynamic"

export default function ViewLogin() {
    const router = useRouter()
    const [dataLogin, setDataLogin] = useState({
        email: "",
        password: ""
    })
    const [client, setClient] = useState(false)

    useShallowEffect(() => {
        if (window) setClient(true)
    }, [])

    if (!client) return <></>

    return (<>
        <Stack>
            <Center>
                <Stack w={300} p={"md"} bg={"gray.1"}>
                    <Title>LOGIN</Title>
                    <TextInput placeholder="email" onChange={(val) => setDataLogin({
                        ...dataLogin,
                        email: val.target.value
                    })} />
                    <TextInput placeholder="password" onChange={(val) => setDataLogin({
                        ...dataLogin,
                        password: val.target.value
                    })} />
                    <Button onClick={async () => {
                        const d = await funLogin(dataLogin)

                        if (!d) return toast("cek connection")
                        if (!d.success) return toast(d.message)
                        return router.replace('/')

                    }}>LOGIN</Button>
                    <UnstyledButton c={"blue"} onClick={() => router.push('/auth/register')}>
                        Register
                    </UnstyledButton>
                </Stack>
            </Center>
        </Stack>
    </>)
}