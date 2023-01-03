import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import Head from 'next/head';
import SuperJSON from 'superjson';
import { InferGetStaticPropsType } from 'next';
import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput';
import { appRouter } from '@/drivers/trpc/routers/_app';
import { NextPageWithLayout } from '@/drivers/next';
import { createContext } from '@/drivers/trpc/trpc';
import { serverEnv } from '@/drivers/env/ServerEnv';
import { DESCRIPTION, SITE_NAME } from '@/drivers/views/components/const';
import DefaultLayout from '@/drivers/views/components/layout/DefaultLayout';
import Library from '@/drivers/views/components/spotify/Library';
import ExternalMarkdownRenderer from '@/drivers/views/components/markdown/ExternalMarkdownRenderer';
import CurrentlyPlaying from '@/drivers/views/components/spotify/CurrentlyPlaying';
import Container from '@/drivers/views/components/common/Container';
import DefaultHeader from '@/drivers/views/components/layout/DefaultHeader';
import { clientEnv } from '@/drivers/env/ClientEnv';

/**
 * ファーストビューにでかでかと出す文章
 */
const TRPC_INPUT_MARKDOWN_HERO: GetMarkdownContentInput = {
  source: 'github',
  owner: 'temasaguru',
  repo: 'temasaguru',
  branch: 'main',
  path: clientEnv.HERO_MARKDOWN_FILENAME,
};

/**
 * プロフィール本文は、あえてREADMEではないファイルに書く
 */
const TRPC_INPUT_MARKDOWN_PROFILE: GetMarkdownContentInput = {
  source: 'github',
  owner: 'temasaguru',
  repo: 'temasaguru',
  branch: 'main',
  // コンポーネントでも使うので`clientEnv`
  path: clientEnv.PROFILE_MARKDOWN_FILENAME,
};

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: SuperJSON,
  });
  await ssg.markdown.getMarkdownHTML.prefetch(TRPC_INPUT_MARKDOWN_HERO);
  await ssg.markdown.getMarkdownHTML.prefetch(TRPC_INPUT_MARKDOWN_PROFILE);
  await ssg.spotify.spotifyLibrary.prefetch({
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
      <div className="flex min-h-screen w-screen flex-col items-center sm:flex-row">
        <Container className="h-screen grow sm:h-auto">
          <ExternalMarkdownRenderer input={TRPC_INPUT_MARKDOWN_HERO} />
        </Container>
        <div>
          <CurrentlyPlaying />
        </div>
      </div>
      <DefaultHeader />
      <Container className="py-8">
        <ExternalMarkdownRenderer input={TRPC_INPUT_MARKDOWN_PROFILE} />
      </Container>
      <Library />
    </div>
  );
};

Home.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Home;
