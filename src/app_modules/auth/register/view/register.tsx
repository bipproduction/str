'use client'
import { Button, Center, PasswordInput, Stack, TextInput, Title, UnstyledButton } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import _ from "lodash"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-simple-toasts"
import { funRegister } from "../fun/register"

export default function ViewRegister() {
    const router = useRouter()
    const [client, setClient] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dataRegis, setDataRegis] = useState({
        name: "",
        email: "",
        password: ""
    })

    useShallowEffect(() => {
        if (window) setClient(true)
    }, [client])

    async function onRegist() {
        setLoading(true)
        if (_.values(dataRegis).includes("")) return toast("isi semua data dengan lengkap")
        const apa = await funRegister(dataRegis)
        if (!apa.success) return toast(apa.message), setLoading(false)
        return toast(apa.message), setLoading(false), router.replace('/auth/login')
    }

    if (!client) return <></>

    return <Center>
        <Stack w={300} p={"md"} bg={"gray.1"}>
            <Title>REGISTER</Title>
            <TextInput label="Name" placeholder="name" onChange={(val) => setDataRegis({
                ...dataRegis,
                name: val.target.value
            })} />
            <TextInput label="Email" placeholder="email" onChange={(val) => setDataRegis({
                ...dataRegis,
                email: val.target.value
            })} />
            <PasswordInput label="Password" placeholder="password" onChange={(val) => setDataRegis({
                ...dataRegis,
                password: val.target.value
            })} />
            <Button onClick={onRegist}>REGISTER</Button>
            <UnstyledButton c={"blue"} onClick={() => router.push('/auth/login')}>
                Login
            </UnstyledButton>
        </Stack>
    </Center>
}