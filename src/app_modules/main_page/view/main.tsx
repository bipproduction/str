'use client'
import { ActionIcon, AppShell, Avatar, Group, Header, Title } from "@mantine/core";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function ViewMainPage({ data, info }: { data: any, info: any }) {
    const router = useRouter()
    const apa = useSearchParams()

    return <AppShell
        header={<Header height={60} p={"sm"}>
            <Group position="apart">
                <Title>STR Storage</Title>
                <ActionIcon
                    onClick={() => router.push('/profile')}
                >
                    <Avatar

                        radius={"100"}
                        color="green"
                        size={52}>
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