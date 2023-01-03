/**
 * GitHub APIのバージョン「2022-11-28」における実装
 */

import { IMarkdownAPI } from '@/application/interfaces/IMarkdownAPI';
import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput';
import { MarkdownContentJSON } from '@/application/interfaces/json/markdown/Content';
import { serverEnv } from '@/drivers/env/ServerEnv';
import { Octokit } from '@octokit/rest';

export class GithubAPIv20221128 implements IMarkdownAPI {
  async getContent(
    input: GetMarkdownContentInput
  ): Promise<MarkdownContentJSON | null> {
    const { owner, repo, branch = 'main', path } = input;
    try {
      const octokit = new Octokit({
        auth: serverEnv.GITHUB_PERSONAL_ACCESS_TOKEN,
      });

      /**
       * getContentはbase64で返ってくるが`content`がstringとなっており扱いづらい
       * 面倒だが厳密にSHAを特定しblobを取る
       * @see https://zenn.dev/e_chan1007/articles/6eeb84f5ce2ef7
       */
      const latestCommit = (
        await octokit.rest.repos.getBranch({ owner, repo, branch })
      ).data.commit;
      const files = (
        await octokit.rest.git.getTree({
          owner,
          repo,
          tree_sha: latestCommit.sha,
          /** ファイルをディレクトリに入れた場合これが必須 */
          recursive: 'true',
        })
      ).data.tree;
      const blob = (
        await octokit.rest.git.getBlob({
          owner,
          repo,
          file_sha: files.find((file) => file.path === path)?.sha!,
        })
      ).data;
      const body = Buffer.from(blob.content, 'base64').toString('utf-8');
      return { fetched_at: new Date(), body };
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
