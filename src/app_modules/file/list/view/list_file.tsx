'use client'
import { useEffect, useState } from "react"
import { funLoadListFile } from "../.."
import { ActionIcon, Flex, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { useShallowEffect } from '@mantine/hooks'
import { MdClose } from 'react-icons/md'

export default function ViewListFile({ userId, listFile }: { userId: any, listFile: any[] }) {
    const [lsFile, setListFile] = useState<any[] | null>(listFile)

    useShallowEffect(() => {
        load()
    }, [])

    async function load() {
        const data = await funLoadListFile(userId)
        setListFile(data)
    }

    return <>
        <Stack bg={"gray.0"} p={"md"}>
            <Title>List File</Title>
            <SimpleGrid spacing={0} cols={3} breakpoints={[
                { maxWidth: '62rem', cols: 3, spacing: 'md' },
                { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                { maxWidth: '36rem', cols: 1, spacing: 'sm' },
            ]}>
                {listFile && listFile.map((v, k) => <div key={k}>
                    <Flex>
                        <ActionIcon>
                            <MdClose />
                        </ActionIcon>
                        <Text>{v.name}</Text>
                    </Flex>
                </div>)}
            </SimpleGrid>
        </Stack>
    </>
}