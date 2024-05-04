import type * as zod from "zod";
import type { Body, Params, Query, State } from "./ApiTypes";

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
  response?: zod.Schema<TResponse>;
  state?: zod.Schema<TState>;
}
