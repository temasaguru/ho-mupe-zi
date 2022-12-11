import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Head from 'next/head';
import SuperJSON from 'superjson';
import { InferGetStaticPropsType } from 'next';
import { appRouter } from '@/drivers/trpc/routers/_app';
import { NextPageWithLayout } from '@/drivers/next';
import { createContext } from '@/drivers/trpc/trpc';
import { serverEnv } from '@/drivers/env/ServerEnv';
import { DESCRIPTION, SITE_NAME } from '@/drivers/views/components/const';
import DefaultLayout from '@/drivers/views/components/layout/DefaultLayout';
import Library from '@/drivers/views/components/spotify/Library';
import Playlist from '@/drivers/views/components/spotify/Playlist';

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: SuperJSON,
  });
  await ssg.spotify.spotifyLibrary.prefetch({
    limit: serverEnv.SPOTIFY_LIBRARY_LIMIT,
  });
  await ssg.spotify.spotifyPlaylist.prefetch({
    playlistId: serverEnv.SPOTIFY_PLAYLIST_ID,
    limit: serverEnv.SPOTIFY_LIBRARY_LIMIT,
  });
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: serverEnv.REVALIDATE_SECONDS,
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPageWithLayout<Props> = () => {
  return (
    <div>
      <Head>
        <title>{SITE_NAME}</title>
        <meta name="description" content={DESCRIPTION}></meta>
      </Head>
      <Playlist />
      <hr className="my-8" />
      <Library />
    </div>
  );
};

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Home;
