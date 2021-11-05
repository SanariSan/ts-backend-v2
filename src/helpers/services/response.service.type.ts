import { ObjectAny } from '../../general.type';

interface ISuccessResponseData {
  result?: string | Array<ObjectAny>;
  success: boolean;
  errorCode: number;
  message: string | null;
  exceptionMessage?: string | null;
  stackTrace: string | null;
}

export { ISuccessResponseData };
