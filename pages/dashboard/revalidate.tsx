import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from '@/drivers/next';
import CustomLink from '@/drivers/views/components/common/CustomLink';
import DashboardLayout from '@/drivers/views/components/layout/DashboardLayout';
import { serverEnv } from '@/drivers/env/ServerEnv';

/**
 * `/dashboard`以下はmiddlewareで保護しているので
 * ここでセッション確認は必要ない
 */
export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext) {
  const path = query.path;
  if (path) {
    const params = new URLSearchParams(
      typeof path === 'string' ? [['path', path]] : path.map((p) => ['path', p])
    );

    /**
     * next-authのセッションを引き継ぐ
     */
    const headers = new Headers();
    headers.append('cookie', req.headers.cookie ?? '');
    return await fetch(
      serverEnv.NEXTAUTH_URL + '/api/revalidate?' + params.toString(),
      { credentials: 'include', headers }
    )
      .then(async (res) => {
        const data = await res.json();
        return {
          props: { result: JSON.stringify(data) },
        };
      })
      .catch((e) => {
        return {
          props: { result: JSON.stringify(e) },
        };
      });
  } else {
    return { props: { result: null } };
  }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
const RevalidatePage: NextPageWithLayout<Props> = ({ result }) => {
  return (
    <div>
      <div>{result ?? 'パラメータが不正'}</div>
      <CustomLink href="/dashboard">ダッシュボードに戻る</CustomLink>
    </div>
  );
};

RevalidatePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default RevalidatePage;
