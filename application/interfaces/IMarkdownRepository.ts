import { GetMarkdownContentInput } from './inputs/GetMarkdownContentInput';
import { MarkdownContentJSON } from './json/markdown/Content';

export interface IMarkdownRepository {
  /**
   * マークダウンをそのまま取得
   */
  getMarkdownRaw(
    input: GetMarkdownContentInput
  ): Promise<MarkdownContentJSON | null>;
  /**
   * マークダウンをHTMLにして取得
   */
  getMarkdownHTML(input: GetMarkdownContentInput): Promise<string | null>;
}
