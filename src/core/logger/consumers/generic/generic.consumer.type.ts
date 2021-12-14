import type { ELOG_LEVEL } from '../../../../general.type';

type TOption = string;

interface ILogEntity {
  readonly source: TOption;
  readonly logLevel: ELOG_LEVEL;
  readonly message: unknown | Error;
}

interface ITargetLogger {
  readonly processMessage: (messageEntity: ILogEntity) => Promise<void>;
}

export type { ILogEntity, TOption, ITargetLogger };
