type IOption = string;
type IOptions = IOption[];
// type IOptions = Array<Required<IOption>>;

interface ILogEntity {
  optionName: IOption;
  message: string;
}

export type { ILogEntity, IOptions };
