interface ISources {
  [key: string]: Array<string | number>;
}

interface ICategory {
  maxCount: number;
  sources: ISources;
}

interface IStorage {
  [key: string]: ICategory;
}

interface IMaxCount {
  readonly category: keyof IStorage;
  readonly property: keyof Pick<ICategory, 'maxCount'>;
  readonly value: number;
}

interface ISource {
  readonly category: keyof IStorage;
  readonly property: keyof Pick<ICategory, 'sources'>;
  readonly source: keyof ISources;
  readonly value: Readonly<Array<string | number>>;
}

type TUpdateLogsStorage = IMaxCount | ISource;

type TGetLogsStorage = {
  readonly category: keyof IStorage;
  readonly property?: keyof ICategory;
  readonly source?: keyof ISources;
};

type TCheckInitializeStorage = {
  readonly category: keyof IStorage;
  readonly source?: keyof ISources;
};

export type {
  IStorage,
  ICategory,
  ISources,
  TUpdateLogsStorage,
  TGetLogsStorage,
  TCheckInitializeStorage,
};
