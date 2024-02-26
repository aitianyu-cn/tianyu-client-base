/**@format */

import { MapOfString } from "@aitianyu.cn/types";
import { RequestMethod, ResponseState } from "../common/State";
import { IXHRLoaderResponse } from "../interface/IXMLHttpRequest";

function _processContent(method: RequestMethod, content: any): string {
    switch (typeof content) {
        case "string":
            return content;
        case "object":
            if (method === "GET") {
                const params: string[] = [];
                for (const key of Object.keys(content)) {
                    params.push(`${key}=${JSON.stringify(content[key])}`);
                }
                if (0 === params.length) {
                    return "";
                }
                return `?${params.join("&")}`;
            }
            return JSON.stringify(content);
        case "undefined":
        default:
            return "";
    }
}

export async function XHRLoader(
    method: RequestMethod,
    url: string,
    content?: any,
    header?: MapOfString,
): Promise<IXHRLoaderResponse> {
    const payload: string = _processContent(method, content);

    const xhr = new XMLHttpRequest();
    const requestUrl = `${url}${method === "GET" ? payload : ""}`;
    xhr.open(method, requestUrl);
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    if (header) {
        for (const key of Object.keys(header)) {
            xhr.setRequestHeader(key, header[key]);
        }
    }
    xhr.send(method === "POST" ? payload : undefined);

    return new Promise<IXHRLoaderResponse>((resolve) => {
        xhr.onerror = (ev) => {
            resolve({
                state: ResponseState.FAILED,
                data: undefined,
                valid: false,
                message: ["HTTP request get an error", `status: ${xhr.status}`, `readyStatus: ${xhr.readyState}`],
            });
        };

        xhr.onload = () => {
            let result: string = "";
            let state: ResponseState = ResponseState.WARNING;
            if (xhr.readyState === 4 && xhr.status === 200) {
                result = xhr.responseText;
                state = ResponseState.SUCCESS;
            }

            resolve({
                state: state,
                data: JSON.parse(result),
                valid: true,
                message: [`status: ${xhr.status}`, `readyStatus: ${xhr.readyState}`],
            });
        };
    });
}
