import type { ELOG_LEVEL } from '../../../general.type';

interface IPublishEntityCore<T = unknown> {
  readonly channel: string;
  readonly logLevel: ELOG_LEVEL;
  readonly message: T;
}

export type { IPublishEntityCore };
