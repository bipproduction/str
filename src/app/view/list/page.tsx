import ViewList from "@/app_modules/view/list"
import { prisma } from "@/utils/prisma"
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function Page() {
    const c = cookies().get('token');
    if (!c || !c.value || _.isEmpty(c.value)) return redirect('/auth/login')
    const user = await unsealData(c.value, { password: process.env.PASSWORD as string })
    if (!user) return redirect('/auth/login')
    const data = await prisma.file.findMany({
        where: {
            userId: user,
            isActive: true
        }
    })
    

    return <>
        <ViewList user={user} data={data as any} />
    </>
}