'use client'

import { ActionIcon, Button, Center, CopyButton, Group, Space, Stack, Text, Title } from "@mantine/core"
import { useRouter } from "next/navigation"
import { MdArrowBackIos } from "react-icons/md"
import LogoutButton from "../widget/logout"

export default function ViewProfile({ data, userName }: { data: any, userName: any }) {
    const router = useRouter()
    return <>
        <Stack>
            <Center p={"lg"}>
                <Stack maw={720} pos={"relative"} style={{
                    wordWrap: "break-word"
                }}>
                    <Group position="apart">
                        <ActionIcon onClick={() => router.back()}>
                            <MdArrowBackIos size={36} />
                        </ActionIcon>
                        <Group>
                            <Text>{userName}</Text>
                            <LogoutButton />
                        </Group>
                    </Group>
                    <Space h={70} />
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