/**@format */

import { IXHRLoaderResponse, ResponseState, XHRLoader } from "../../packages/index";

describe("aitianyu-cn.node-module.client-base.client.XMLHttpRequest", () => {
    beforeEach(() => {
        jest.setTimeout(100000);
    });

    it("post", (done) => {
        const { XMLHttpRequest } = require("xmlhttprequest");
        global.XMLHttpRequest = XMLHttpRequest;

        const content = {
            lang: "zh_CN",
        };

        const response = XHRLoader("POST", "http://aitianyu.cn/remote-project/aitianyu/cn/project/download/all", content, {
            "Access-Control-Allow-Origin": "*",
        });
        response.then((value: IXHRLoaderResponse) => {
            expect(value.state).toEqual(ResponseState.SUCCESS);
            expect(value.valid).toBeTruthy();
            expect(value.data).toBeDefined();
            console.log(JSON.stringify(value));
            done();
        }, done.fail);
    });
});
