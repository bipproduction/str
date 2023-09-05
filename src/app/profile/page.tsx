import ViewProfile from "@/app_modules/profile/view/profile";
import { funGetUser } from "@/utils/get_user";

export default async function Page() {
    const user = await funGetUser()
    if (!user) return <>Login Please</>
    return <>
        <ViewProfile data={user} />
    </>
}