import { sleep } from '../../../helpers/util';
import type { IStorage } from './logs.storage.type';

class LogsStorage {
  private static readonly rawStorage: IStorage = {
    maxCount: 1000,
    all: [],
  };

  private static readonly customStorage: {
    [key: string]: IStorage & { [key: string]: unknown };
  } = {
    dashboard: {
      maxCount: 300,
      all: [],
      byChannels: {
        name: [],
        name2: [],
      },
    },
    cli: {
      maxCount: 500,
      all: [],
    },
  };

  public static getCustomStorage(property: string) {
    return this.customStorage[property];
  }

  public static getRawStorage() {
    return this.rawStorage;
  }

  public static async rotateStorages() {
    if (this.rawStorage.all.length >= this.rawStorage.maxCount) {
      const diff = this.rawStorage.all.length - this.rawStorage.maxCount;
      this.rawStorage.all = this.rawStorage.all.slice(diff);
    }

    Object.keys(this.customStorage).forEach((key) => {
      if (this.customStorage[key].all.length >= this.customStorage[key].maxCount) {
        const diff = this.customStorage[key].all.length - this.customStorage[key].maxCount;
        this.customStorage[key].all = this.customStorage[key].all.slice(diff);
      }
    });

    await sleep(5000);

    void this.rotateStorages();
  }
}

void LogsStorage.rotateStorages();

export { LogsStorage };
