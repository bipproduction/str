'use client'
import { ActionIcon, BackgroundImage, Box, Flex, Image } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { File } from "@prisma/client";
import { IconRowRemove, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { funList } from "./fun/list";

export default function ViewList({ user, data }: { user: any, data: File[] }) {
    const router = useRouter()
    const listData = useState(data)

    useShallowEffect(() => {
        funList(user).then(listData[1])
    }, [])
    return <>
        <Flex 
            wrap={"wrap"}
            p={"md"}
            gap={"md"}
            draggable={true}
            onDragOver={(val) => {
                val.preventDefault()
                return router.push('/view/create')
            }}
            onDrop={(val) => {
                val.preventDefault()
            }}
        >
            {listData[0].map((v, k) => <Box key={k}>
                <BackgroundImage w={200} h={200} src={`/file/${v.id}.${v.ext}`} >
                    <ActionIcon pos={"absolute"} variant="filled" color="red" onClick={() => router.push(`/view/delete?id=${v.id}`)}>
                        <IconX />
                    </ActionIcon>
                </BackgroundImage>
            </Box>)}
        </Flex>
    </>
}