import type { IHttpResponse } from "./HttpResponse";

export interface IFileUpload extends IHttpResponse {
    result: {
        url: string;
    };
}
