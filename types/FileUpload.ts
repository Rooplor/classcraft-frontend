import type { HttpResponse } from "./HttpResponse";

export interface IFileUpload extends HttpResponse {
    result: {
        url: string;
    };
}
