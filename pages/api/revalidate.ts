import { constants } from 'http2';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

/**
 * ISRのキャッシュ更新用APIルート
 * @param req `?path=更新するページのパス` を1つのみ受け付ける
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    const query = req.query;
    const path = query.path;
    if (typeof path === 'string') {
      try {
        await res.revalidate(path);
        return res
          .status(constants.HTTP_STATUS_OK)
          .json({ path, message: 'キャッシュ更新成功' });
      } catch (err) {
        return res
          .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
          .json({ path, message: 'キャッシュ更新失敗' });
      }
    } else {
      return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
        path,
        message: 'pathは1つのみ指定せよ',
      });
    }
  } else {
    res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      path: null,
      message: 'UNAUTHORIZED',
    });
  }
  res.end();
}
