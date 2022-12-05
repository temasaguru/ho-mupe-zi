import { EncrypterAES256CBC } from './EncrypterAES256CBC';

describe('暗号化と復号', () => {
  const string = 'こんにちは';
  test('AES256CBCアルゴリズム', () => {
    const encrypter = new EncrypterAES256CBC();
    const encrypted = encrypter.encrypt(string);
    const decrypted = encrypter.decrypt(encrypted);
    expect(decrypted).toStrictEqual(string);
  });
});
