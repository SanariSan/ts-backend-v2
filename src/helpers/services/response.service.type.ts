import type { AxiosResponse } from 'axios';
import type { ObjectAny } from '../../general.type';

interface IParsedResponse {
  request: {
    // data: ;
    request: ObjectAny;
    headers: string;
  };
  response: {
    response: AxiosResponse;
    data?: string | ObjectAny;
    headers: ObjectAny;
  };
}

export type { IParsedResponse };
