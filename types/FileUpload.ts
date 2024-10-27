import type { IResponse } from "./Response";

export interface IFileUpload extends IResponse {
    result: {
        url: string;
    };
}
