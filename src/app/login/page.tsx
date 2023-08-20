import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export default async function LoginPage({ searchParams }: { searchParams: { name: string, password: string } }) {
    if (!searchParams.name || !searchParams.password) return <>name=?&password=?</>
    const apa = await fetch(`${process.env.URL_HOST}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify({ name: searchParams.name, password: searchParams.password }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(v => v.json())
    if (apa.success) return redirect('/')
    return <>
        {JSON.stringify(apa)}
    </>

}