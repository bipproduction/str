import { Button } from "@mantine/core";
import { MdLogout } from "react-icons/md";
import { funLogout } from "../fun/logout";
import toast from "react-simple-toasts";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter()
    async function onLogout() {
        const apa = await funLogout()
        if (!apa) return toast("gagal")
        router.replace("/auth/login")
    }
    return <Button onClick={onLogout} bg={"orange"} compact={true} leftIcon={<MdLogout />}>
        LOGOUT
    </Button>
}