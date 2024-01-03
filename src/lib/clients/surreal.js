import { Surreal } from "$lib/misc/surrealdb/http";
import {
  SURREAL_DB,
  SURREAL_NS,
  SURREAL_PASS,
  SURREAL_URL,
  SURREAL_USER
} from "$env/static/private";


export const surreal = new Surreal(SURREAL_URL, {
  ns: SURREAL_NS,
  db: SURREAL_DB,
  auth: {
    user: SURREAL_USER,
    pass: SURREAL_PASS,
  }
});
