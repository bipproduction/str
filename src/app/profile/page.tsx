import ViewProfile from "@/app_modules/profile/view/profile";
import { funGetUser } from "@/utils/get_user";
import { prisma } from "@/utils/prisma";

export default async function Page() {
    const user = await funGetUser()
    if (!user) return <><a href="/">Login please!</a></>
    const userName = await prisma.user.findUnique({where: {id: user.id as any}})
    return <>
        <ViewProfile data={user} userName={userName?.name} />
    </>
}