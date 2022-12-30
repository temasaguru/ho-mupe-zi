import { GetMarkdownContentInput } from './inputs/GetMarkdownContentInput';
import { MarkdownContentJSON } from './json/markdown/Content';

/**
 * 万が一GitHub以外にホストする場合に備えて
 * この型を様々なAPIで実装できるようにする
 */
export interface IMarkdownAPI {
  /**
   * リポジトリのファイル内容を取得
   * Markdownを想定している
   */
  getContent(
    input: GetMarkdownContentInput
  ): Promise<MarkdownContentJSON | null>;
}
