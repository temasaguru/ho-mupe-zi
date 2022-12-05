import { Redis } from '@upstash/redis';
import {
  DatabaseEncryptedKeys,
  DatabaseKeys,
} from '@/application/interfaces/IDBConnection';
import { IDBConnection } from '@/application/interfaces/IDBConnection';
import { IEncrypter } from '@/application/interfaces/IEncrypter';
import { serverEnv } from '@/drivers/env/ServerEnv';

/**
 * RedisによるDBの実装
 * 暗号化・復号クラスに依存している
 */
export class RedisConnection implements IDBConnection {
  private client: Redis;
  private encrypter: IEncrypter;

  constructor(encrypter: IEncrypter) {
    this.client = new Redis({
      url: serverEnv.UPSTASH_REDIS_REST_URL,
      token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
    });
    this.encrypter = encrypter;
  }

  async get<T>(key: DatabaseKeys) {
    return await this.client.get<T>(key);
  }

  async getEncrypted<T>(key: DatabaseEncryptedKeys) {
    const encrypted = await this.client.get<string>(key);
    if (encrypted) {
      try {
        const decrypted = this.encrypter.decrypt(encrypted);
        return decrypted as T;
      } catch (e) {
        console.error(e);
        return null;
      }
    } else {
      return null;
    }
  }

  async set<T, U extends string = DatabaseKeys>(key: U, data: T) {
    const result = await this.client.set<T>(key, data);
    if (result !== 'OK') {
      return result ?? null;
    }
  }

  async setEncrypted<T>(key: DatabaseEncryptedKeys, data: string) {
    try {
      const encrypted = this.encrypter.encrypt(data);
      if (encrypted) {
        return (await this.set<string, DatabaseEncryptedKeys>(
          key,
          encrypted
        )) as T;
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
