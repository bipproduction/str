import { cookies } from 'next/headers'
import { funCheckCookie } from '../../app_modules/bin/check_cookie';

export const dynamic = 'force-dynamic'

export default async function Page() {
  const c = await funCheckCookie()
  return (<>
    {JSON.stringify(c)}
  </>);
}
