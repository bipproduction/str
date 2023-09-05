'use client'

import { ActionIcon, Button, Center, CopyButton, Group, Stack, Text, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import { MdArrowBackIos } from "react-icons/md"

export default function ViewProfile({ data }: { data: any }) {
    const router = useRouter()
    return <>
        <Stack>
            <Center p={"lg"}>
                <Stack maw={720} pos={"relative"} style={{
                    wordWrap: "break-word"
                }}>
                    <ActionIcon onClick={() => router.back()}>
                        <MdArrowBackIos size={36} />
                    </ActionIcon>
                    <Title>Api Key</Title>
                    <Group position="right">
                        <CopyButton value={data.token}>
                            {({ copied, copy }) => (
                                <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                                    {copied ? 'Copied Api Key' : 'Copy Api Key'}
                                </Button>
                            )}
                        </CopyButton>
                    </Group>
                    <Text p={"md"} bg={"gray.1"}>
                        {data.token}
                    </Text>

                </Stack>
            </Center>
        </Stack>
    </>
}