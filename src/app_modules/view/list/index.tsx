'use client'
import { ActionIcon, BackgroundImage, Box, Button, CopyButton, Flex, Image } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { File } from "@prisma/client";
import { IconCopy, IconCopyOff, IconRowRemove, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { funList } from "./fun/list";
import { Notify } from "notiflix";

const listExtimage = ["png", "jpg", "gif", "jpeg"]

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
            {/* {JSON.stringify(listData[0])} */}
            {listData[0].map((v, k) => <Box key={k}>
                <BackgroundImage w={200} h={200} src={!listExtimage.includes(v.ext) ? '/assets/default/file.png' : `/file/${v.id}.${v.ext}`} pos={"relative"}>
                    <ActionIcon pos={"absolute"} variant="filled" color="red" onClick={() => router.push(`/view/delete?id=${v.id}`)}>
                        <IconX />
                    </ActionIcon>
                    <CopyButton value={`https://str.wibudev.com/file/${v.id}.${v.ext}`}>
                        {({ copied, copy }) => (
                            <ActionIcon pos={"absolute"} right={0} variant="filled" bg={copied ? 'teal' : 'blue'} onClick={() => {
                                Notify.success("copied")
                                copy()
                            }}>
                                <IconCopy />
                            </ActionIcon>
                        )}
                    </CopyButton>
                </BackgroundImage>
            </Box>)}
        </Flex>
    </>
}