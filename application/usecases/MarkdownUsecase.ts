import { IMarkdownRepository } from '../interfaces/IMarkdownRepository';
import { GetMarkdownContentInput } from '../interfaces/inputs/GetMarkdownContentInput';
import { MarkdownContentJSON } from '../interfaces/json/markdown/Content';

export class MarkdownUseCase {
  private repository: IMarkdownRepository;

  constructor(repository: IMarkdownRepository) {
    this.repository = repository;
  }

  async getMarkdownHTML(
    input: GetMarkdownContentInput
  ): Promise<string | null> {
    return await this.repository.getMarkdownHTML(input);
  }
}
