import { isValidString, sleep } from '../../../helpers/util';
import type {
  ICategory,
  ISources,
  IStorage,
  TCheckInitializeStorage,
  TGetLogsStorage,
  TUpdateLogsStorage,
} from './logs.storage.type';

/**
 * Module basically allows you to store fixed amount of logs at runtime
 * So you can access it whenever needed and send/save/show/...
 *
 * However, it's not really suitable for consumers which need
 * 1 log entity at a time and don't need access to logs history
 *
 * In this case you should store a hash/copy of last accessed log on consumer side
 * When next time accessing storage - find last log position and parse trailing, then repeat
 *
 * ! Or just avoid using this module when don't need runtime storage !
 */

// TODO: throw error if not valid string passed (?)

class LogsStorage {
  private static readonly defaultMaxCount = 150;

  private static readonly defaultRotateMs = 5000;

  private static readonly logsStorage: IStorage = {};

  public static getLogsStorage(optionsObject: TGetLogsStorage) {
    const { category, property, source } = optionsObject;

    this.checkIntializeStorage({ category, source });

    if (isValidString(category)) {
      if (isValidString(property)) {
        if (isValidString(source)) {
          return this.logsStorage[category].sources[source as keyof ISources];
        }
        return this.logsStorage[category][property as keyof ICategory];
      }
      return this.logsStorage[category];
    }

    return;
  }

  public static updateLogsStorage(optionsObject: TUpdateLogsStorage) {
    const { property } = optionsObject;

    if (property === 'maxCount') {
      const { category, value } = optionsObject;
      this.checkIntializeStorage({ category });
      this.logsStorage[category].maxCount = value;
      return;
    }

    const { category, source, value } = optionsObject;

    if (isValidString(source)) {
      this.checkIntializeStorage({ category, source });
      this.logsStorage[category].sources[source].push(...value);
    }
  }

  public static checkIntializeStorage({ category, source }: TCheckInitializeStorage) {
    // if global category is not defined - put template into it
    if (isValidString(category)) {
      this.logsStorage[category] ??= {
        maxCount: this.defaultMaxCount,
        sources: {},
      };
    }

    // if source (custom) additionally passed - put empty array to later fill with logs
    if (isValidString(category) && isValidString(source)) {
      this.logsStorage[category].sources[source as keyof ISources] ??= [];
    }
  }

  public static async rotateLogs() {
    Object.keys(this.logsStorage).forEach((categoryKey) => {
      const category = this.logsStorage[categoryKey];

      Object.keys(category.sources).forEach((sourceKey) => {
        const source = category.sources[sourceKey];

        if (source.length >= category.maxCount) {
          const diff = source.length - category.maxCount;

          category.sources[sourceKey] = source.slice(diff);
        }
      });
    });

    await sleep(this.defaultRotateMs);

    void this.rotateLogs();
  }
}

void LogsStorage.rotateLogs();

export { LogsStorage };
