/**@format */

export abstract class FileLoaderBase<ResponseType> {
    protected url: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected response: ResponseType | null;

    public constructor(url: string) {
        this.url = url;
        this.response = null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public getResponse(): ResponseType | null {
        return this.response;
    }

    public abstract open(): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract openAsync(): Promise<ResponseType>;
}
