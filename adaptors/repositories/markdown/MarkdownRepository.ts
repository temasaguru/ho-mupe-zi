import { IMarkdownAPI } from '@/application/interfaces/IMarkdownAPI';
import { IMarkdownRepository } from '@/application/interfaces/IMarkdownRepository';
import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput';
import { MarkdownContentJSON } from '@/application/interfaces/json/markdown/Content';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

/**
 * Markdownの取得部分 APIを注入して使う
 */
export class MarkdownRepository implements IMarkdownRepository {
  private api: IMarkdownAPI;

  constructor(api: IMarkdownAPI) {
    this.api = api;
  }

  async getMarkdownRaw(
    input: GetMarkdownContentInput
  ): Promise<MarkdownContentJSON | null> {
    return await this.api.getContent(input);
  }

  async getMarkdownHTML(
    input: GetMarkdownContentInput
  ): Promise<string | null> {
    const markdown = await this.getMarkdownRaw(input);

    if (markdown) {
      const result = unified()
        .use(remarkParse)
        .use(remarkGfm) // 脚注などに必要
        .use(remarkEmoji) // GFMだけじゃ絵文字が変わらない
        .use(remarkRehype, {
          /** <br>を表で使ったりするので、消さずに残す */
          allowDangerousHtml: true,
        })
        .use(rehypeStringify, {
          /** 残した<br>などをHTMLとして解釈する */
          allowDangerousHtml: true,
        })
        .processSync(markdown.body);
      return result.toString();
    } else {
      return null;
    }
  }
}
