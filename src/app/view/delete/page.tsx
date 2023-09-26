import ViewDelete from "@/app_modules/view/delete"
import { funGetUser } from "@/utils/get_user"
import { redirect, useSearchParams } from "next/navigation"

export default async function Page(){
    const user = await funGetUser()
    if(!user) return redirect('/auth/login')
    
    return <>
        <ViewDelete />
    </> 
}