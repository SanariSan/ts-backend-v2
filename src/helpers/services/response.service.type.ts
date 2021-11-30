import type { ObjectAny } from '../../general.type';

interface ISuccessResponseData {
  result?: string | ObjectAny[];
  success: boolean;
  errorCode: number;
  message: string | null;
  exceptionMessage?: string | null;
  stackTrace: string | null;
}

export type { ISuccessResponseData };
