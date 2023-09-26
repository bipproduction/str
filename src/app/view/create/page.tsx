import ViewCreate from "@/app_modules/view/create";
import { unsealData } from "iron-session";
import _ from "lodash";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const c = cookies().get('token');
    if (!c || !c.value || _.isEmpty(c.value)) return redirect('/auth/login')
    const user = await unsealData(c.value, { password: process.env.PASSWORD as string })
    if (!user) return redirect('/auth/login')
    return <>
        <ViewCreate user={user as any} />
    </>
}