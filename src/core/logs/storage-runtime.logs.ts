import { isValidString, sleep } from '../../helpers/util';
import type { ICategory, ISources, IStorage } from './storage-runtime.logs.type';

// TODO: throw error if not valid string passed (?)
class LogsStorage {
  private static readonly defaultMaxCount = 150;

  private static readonly defaultRotateMs = 5000;

  private static readonly logsStorage: IStorage = {};

  public static getLogsStorage({
    category,
    property,
    source,
  }: {
    readonly category: keyof IStorage;
    readonly property?: keyof ICategory;
    readonly source?: keyof ISources;
  }) {
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

  public static setLogsStorage({
    category,
    property,
    source,
    value,
  }: {
    readonly category: keyof IStorage;
    readonly property: keyof ICategory;
    readonly source?: keyof ISources;
    readonly value: number | Array<string | number>;
  }) {
    this.checkIntializeStorage({ category, source });

    if (property === 'maxCount') {
      this.logsStorage[category].maxCount = value as number;
      return;
    }

    if (property === 'sources' && isValidString(source)) {
      this.logsStorage[category].sources[source as keyof ISources] = value as Array<
        string | number
      >;
    }
  }

  public static checkIntializeStorage({
    category,
    source,
  }: {
    readonly category: keyof IStorage;
    readonly source?: keyof ISources;
  }) {
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
