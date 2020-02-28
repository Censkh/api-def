import {Body, Params, Query} from "./ApiTypes";
import Endpoint, {EndpointConfig} from "./Endpoint";
import {Api} from "./Api";

export default class EndpointBuilder<R = any,
    P extends Params | undefined = Params | undefined,
    Q extends Query | undefined = Query | undefined,
    B extends Body | undefined = Body | undefined> {

    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    queryOf<Q extends Query>(): EndpointBuilder<R, P, Q, B> {
        return this as any;
    }

    paramsOf<P extends Params>(): EndpointBuilder<R, P, Q, B> {
        return this as any;
    }

    bodyOf<B extends Body>(): EndpointBuilder<R, P, Q, B> {
        return this as any;
    }

    responseOf<R>() : EndpointBuilder<R, P, Q, B> {
        return this as any;
    }

    build(config: EndpointConfig<R, P, Q, B>): Endpoint<R, P, Q, B> {
        const endpoint = new Endpoint(this.api, config);
        (this.api as any).endpoints[endpoint.id] = endpoint as Endpoint;
        return endpoint;
    }

}