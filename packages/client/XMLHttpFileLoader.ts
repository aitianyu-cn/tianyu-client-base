/**@format */

import { CallbackAction } from "@aitianyu.cn/types";
import { FileLoaderBase } from "./FileLoaderBase";

export class XMLHttpFileLoader<ResponseType> extends FileLoaderBase<ResponseType> {
    private send: Document | XMLHttpRequestBodyInit | null;
    private onload: CallbackAction | null;
    private onerror: CallbackAction | null;

    public constructor(url: string) {
        super(url);
        this.send = null;
        this.onload = null;
        this.onerror = null;
    }

    public setSend(send: Document | XMLHttpRequestBodyInit): void {
        this.send = send;
    }
    public setOnload(callback: () => void): void {
        this.onload = callback;
    }
    public setOnerror(callback: () => void): void {
        this.onerror = callback;
    }

    public override open(type: "Get" | "Post" = "Get"): void {
        try {
            const request = new XMLHttpRequest();
            request.open(type, this.url);
            request.send(this.send);
            request.onload = () => {
                if (request.status === 200) {
                    this.response = request.response;
                    if (this.onload) {
                        this.onload();
                    }
                } else if (this.onerror) {
                    this.onerror();
                }
            };
        } catch {
            if (this.onerror) {
                this.onerror();
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public override openAsync(type: "Get" | "Post" = "Get"): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            try {
                const request = new XMLHttpRequest();
                request.open(type, this.url);
                request.send(this.send);
                request.onload = () => {
                    if (request.status === 200) {
                        this.response = request.response;
                        if (this.onload) {
                            this.onload();
                        }
                        resolve(this.response);
                    } else {
                        if (this.onerror) {
                            this.onerror();
                        }
                        reject();
                    }
                };
            } catch {
                if (this.onerror) {
                    this.onerror();
                }
                reject();
            }
        });
    }
}
