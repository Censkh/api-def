import * as zod from "zod";
import { Body, Params, Query } from "./ApiTypes";

export interface Validation<R = any,
  P extends Params | undefined = Params | undefined,
  Q extends Query | undefined = Query | undefined,
  B extends Body | undefined = Body | undefined> {
  query?: zod.Schema<Q>,
  params?: zod.Schema<P>,
  body?: zod.Schema<B>,
  response?: zod.Schema<R>,
}