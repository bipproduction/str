import ViewMainPage from '@/app_modules/main_page/view/main';
import { funGetUser } from '@/utils/get_user';
import { redirect } from 'next/navigation';
import fs from 'fs'
import { NextRequest } from 'next/server';

const info = fs.readFileSync('./public/info.md').toString()

export default async function Page() {
  const user = await funGetUser()
  if (!user) return redirect('/auth/login')



  return <ViewMainPage info={info} data={{
    token: user.token,
    userId: user.id
  }} />;
}
