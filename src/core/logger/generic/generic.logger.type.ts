type TOption = string;

interface ILogEntity {
  readonly source: TOption;
  readonly message: unknown;
}

interface ITargetLogger {
  readonly category: string;
  readonly processMessage: (messageEntity: ILogEntity) => void;
}

export type { ILogEntity, TOption, ITargetLogger };
