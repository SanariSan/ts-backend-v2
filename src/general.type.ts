type TObjectG<T> = { [key: string]: T };
type TObjectString = TObjectG<string>;
type TObjectNumber = TObjectG<number>;
type TObjectBoolean = TObjectG<boolean>;
type TObjectUnknown = TObjectG<unknown>;
type TObjectAny = TObjectG<any>;

enum ELOG_LEVEL {
  ERROR,
  WARN,
  INFO,
  DEBUG,
  SILLY,
}

// deep modify if needed https://stackoverflow.com/a/65561287

export type { TObjectG, TObjectString, TObjectNumber, TObjectBoolean, TObjectUnknown, TObjectAny };
export { ELOG_LEVEL };
