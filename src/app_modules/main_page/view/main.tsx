'use client'
import { ActionIcon, AppShell, Avatar, Group, Header, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function ViewMainPage({ data, info }: { data: any, info: any }) {
    const router = useRouter()
    return <AppShell
        header={<Header height={60} p={"sm"}>
            <Group position="apart">
                <Title>Str</Title>
                <ActionIcon radius={"lg"} onClick={() => router.push('/profile')}>
                    <Avatar>

                    </Avatar>
                </ActionIcon>
            </Group>
        </Header>}
    >

        <MarkdownPreview style={{
            padding: 16
        }} source={info} />
    </AppShell>
}