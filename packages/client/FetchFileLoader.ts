/**@format */

import { FileLoaderBase } from "./FileLoaderBase";

export class FetchFileLoader extends FileLoaderBase<any> {
    public constructor(url: string) {
        super(url);
    }

    public override open(): void {
        this.openAsync();
    }

    public override async openAsync(): Promise<any> {
        try {
            const response = await fetch(this.url);
            const responseText = await response.text();
            this.response = JSON.parse(responseText || "{}");

            return this.response;
        } catch {
            return null;
        }
    }
}
