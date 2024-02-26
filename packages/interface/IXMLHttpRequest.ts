/**@format */

import { ResponseState } from "../common/State";

export interface IXHRLoaderResponse {
    state: ResponseState;
    data: any;
    valid: boolean;
    message: string[];
}
