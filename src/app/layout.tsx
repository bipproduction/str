import RootStyleRegistry from './emotion';

export default function RootLayout({ children }: { children: any }) {
  return <html lang='en-US'>
    <head />
    <body suppressHydrationWarning={true}>
      <RootStyleRegistry>
        {children}
      </RootStyleRegistry>
    </body>
  </html>;
}
