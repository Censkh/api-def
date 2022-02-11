import Endpoint from "./Endpoint";

export type ResponseOf<E extends Endpoint<any, any, any, any>> = E extends Endpoint<infer R, any, any, any> ? R : never;

export type ParamsOf<E extends Endpoint<any, any, any, any>> = E extends Endpoint<any, infer P, any, any> ? P : never;

export type QueryOf<E extends Endpoint<any, any, any, any>> = E extends Endpoint<any, any, infer Q, any> ? Q : never;

export type BodyOf<E extends Endpoint<any, any, any, any>> = E extends Endpoint<any, any, any, infer B> ? B : never;

