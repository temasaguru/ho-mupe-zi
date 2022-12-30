import { IMarkdownAPI } from '@/application/interfaces/IMarkdownAPI';
import { IMarkdownRepository } from '@/application/interfaces/IMarkdownRepository';
import { GetMarkdownContentInput } from '@/application/interfaces/inputs/GetMarkdownContentInput';
import { MarkdownContentJSON } from '@/application/interfaces/json/markdown/Content';
import { createMarkdown } from 'safe-marked';

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
    const parse = createMarkdown();
    const markdown = await this.getMarkdownRaw(input);
    if (markdown) {
      return parse(markdown.body);
    } else {
      return null;
    }
  }
}
