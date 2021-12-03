type TOption = string;

interface ILogEntity {
  readonly optionName: TOption;
  readonly message: string;
}

export type { ILogEntity, TOption };
