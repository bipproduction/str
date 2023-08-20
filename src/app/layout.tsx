import { redirect } from 'next/navigation';
import RootStyleRegistry from './emotion';
import { cookies } from 'next/headers'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('str_token') ?? null

  return (
    <RootStyleRegistry>{children}</RootStyleRegistry>
  );
}
