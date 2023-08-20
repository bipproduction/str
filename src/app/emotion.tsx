'use client';

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'
toastConfig({
  theme: "dark"
})

export default function RootStyleRegistry({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <html lang='en-US'>
      <body suppressHydrationWarning={true}>
        <CacheProvider value={cache}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            {children}
          </MantineProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
