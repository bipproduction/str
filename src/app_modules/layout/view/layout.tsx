'use client'

import ViewLogout from "@/app_modules/auth/logout/view/logout"
import { ViewUpload } from "@/app_modules/file"
import { AppShell, Group, Header, Title } from "@mantine/core"

export default function ViewLayout({ props, user }: { props: any, user: any }) {
    return (<AppShell
        header={<Header height={60} >
            <Group position="apart">
                <Title>STR</Title>
                <ViewLogout />
            </Group>
        </Header>}
    >
        {props.children}
        <ViewUpload token={user.token} props={props} />
        {props.list_file}
    </AppShell>)
}