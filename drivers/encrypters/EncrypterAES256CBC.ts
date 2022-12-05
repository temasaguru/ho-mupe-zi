import crypto from 'crypto';
import { IEncrypter } from '@/application/interfaces/IEncrypter';
import { serverEnv } from '@/drivers/env/ServerEnv';

/**
 * AES-256-CBCアルゴリズムでの実装
 * @see https://www.greptips.com/posts/1345/
 */
export class EncrypterAES256CBC implements IEncrypter {
  private ENCRYPTION_ALGORITHM = 'aes-256-cbc';
  private ENCRYPTION_DELIMITER = '$';
  private AES_IV_LENGTH = 16;

  public encrypt(data: string): string {
    const iv = crypto.randomBytes(this.AES_IV_LENGTH);
    const cipher = crypto.createCipheriv(
      this.ENCRYPTION_ALGORITHM,
      serverEnv.ENCRYPTION_KEY,
      iv
    );
    const encrypted =
      cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
    const ivWithEncrypted =
      iv.toString('base64') + this.ENCRYPTION_DELIMITER + encrypted;
    return ivWithEncrypted;
  }

  public decrypt(ivWithEncrypted: string): string {
    const [iv, encrypted] = ivWithEncrypted.split(this.ENCRYPTION_DELIMITER);
    const decipher = crypto.createDecipheriv(
      this.ENCRYPTION_ALGORITHM,
      serverEnv.ENCRYPTION_KEY,
      Buffer.from(iv, 'base64')
    );
    const decrypted =
      decipher.update(encrypted, 'base64', 'utf8') + decipher.final('utf8');
    return decrypted;
  }
}
