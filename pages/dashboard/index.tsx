import { InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import SuperJSON from 'superjson';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '@/drivers/trpc/routers/_app';
import { createContext } from '@/drivers/trpc/trpc';
import { NextPageWithLayout } from '@/drivers/next';
import UserInfoSmall from '@/drivers/views/components/auth/UserInfoSmall';
import DashboardLayout from '@/drivers/views/components/layout/DashboardLayout';
import { SITE_NAME } from '@/drivers/views/components/const';

export const getServerSideProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: SuperJSON,
  });
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const Dashboard: NextPageWithLayout<Props> = () => {
  return (
    <div>
      <Head>
        {/*
          テンプレートリテラルを使わないと複数の子要素になって警告される
          @see https://github.com/vercel/next.js/discussions/38256
        */}
        <title>{`${SITE_NAME} dashboard`}</title>
      </Head>
      <UserInfoSmall />
    </div>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
