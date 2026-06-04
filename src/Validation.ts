import type * as zod from "zod";
import type { Body, Params, Query, RequestBodyEncoding, State } from "./ApiTypes";

export interface ValidationOptions<TValue> {
  schema?: zod.Schema<TValue>;
}

export interface BodyValidationOptions<TBody extends Body> extends ValidationOptions<TBody> {
  encoding?: RequestBodyEncoding;
}

export interface Validation<
  TResponse = any,
  TParams extends Params | undefined = Params | undefined,
  TQuery extends Query | undefined = Query | undefined,
  TBody extends Body | undefined = Body | undefined,
  TState extends State = State,
> {
  query?: zod.Schema<TQuery>;
  params?: zod.Schema<TParams>;
  body?: zod.Schema<TBody>;
  bodyEncoding?: RequestBodyEncoding;
  response?: zod.Schema<TResponse>;
  state?: zod.Schema<TState>;
}
