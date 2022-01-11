type TObjectG<T> = { [key: string]: T };
type TObjectString = TObjectG<string>;
type TObjectNumber = TObjectG<number>;
type TObjectBoolean = TObjectG<boolean>;
type TObjectUnknown = TObjectG<unknown>;
type TObjectAny = { [key: string]: any };

enum ELOG_LEVEL {
  ERROR,
  WARN,
  INFO,
  DEBUG,
  SILLY,
}

export type { TObjectG, TObjectString, TObjectNumber, TObjectBoolean, TObjectUnknown, TObjectAny };
export { ELOG_LEVEL };
