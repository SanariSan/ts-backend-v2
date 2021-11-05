import { CustomEventEmitter } from '.';

type TCb = (...args: any[]) => void;
type TKey = string;
type TEName = string;
type TKeyCb = Map<TKey, TCb>;
type TENameKeyCb = Map<TEName, TKeyCb>;
type TGetEmitterKeyCbMapsListener =
  | {
      emitter: CustomEventEmitter;
      keyCbMaps: TKeyCb;
      listener: TCb;
    }
  | never;

export { TCb, TEName, TKey, TKeyCb, TENameKeyCb, TGetEmitterKeyCbMapsListener };
