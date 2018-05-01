/*
 * Copyright (C) 2018 SE RWTH.
 *
 * TODO: Include License.
 */

import URIBase from "@theia/core/lib/common/uri";
import Uri from "vscode-uri";

export default class URI extends URIBase {
    public constructor(uri?: string | Uri) {
        super(uri);
    }

    /**
     * return a Map with the query params and their respective keys
     */
    public getQueryParams(): Map<string, string> {
        const queryParams = new Map();

        this.query.split('&').forEach(params => {
            const values = params.split('=');

            queryParams.set(values[0], values[1]);
        });

        return queryParams;
    }

    /**
     * return whether the key is in the query params
     */
    public hasQueryParam(key: string): boolean {
        return this.getQueryParams().has(key);
    }

    /**
     * return the value of a key in the query params
     */
    public getQueryParam(key: string): string | undefined {
        return this.getQueryParams().get(key);
    }

    /**
     * return an array of sub uris relative to the current uri.
     */
    public getSubURIs(): URI[] {
        let parentURI = '';
        const uris: URI[] = [];

        uris.push(this);

        while (this.parent.toString() !== parentURI) {
            parentURI = this.parent.toString();

            uris.push(new URI(parentURI));
        }

        return uris.reverse();
    }
}
