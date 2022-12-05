import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { trpc } from '@/drivers/views/hooks/trpc';
import { NextPageWithLayout } from '@/drivers/next';
import '@/drivers/styles/globals.css';

type AppPropsWithLayout = AppProps<{
  session: Session;
}> & {
  Component: NextPageWithLayout;
};

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const { pathname } = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  /**
   * ダッシュボードでのみSessionProviderが必要
   * 分岐させないと、`/api/auth/session` に無駄なリクエストが発生する
   */
  if (pathname.startsWith('/dashboard')) {
    return getLayout(
      <SessionProvider session={session}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    );
  } else {
    return getLayout(
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
};

export default trpc.withTRPC(App);
