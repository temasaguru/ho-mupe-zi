/**
 * 複数の暗号化アルゴリズムに対応できるように定義
 * アルゴリズムを変えると既存データの再セットが必要になるため注意
 */
export interface IEncrypter {
  /**
   * 暗号化
   */
  encrypt(string: string): string;
  /**
   * 復号
   */
  decrypt(string: string): string;
}
