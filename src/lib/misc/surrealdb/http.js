/** @typedef {import("./types").Store} Store */

/** @implements {Store} */
export class Surreal {
  /**
   * @param {string} url 
   * @param {import("./types").Options} opts 
   */
  constructor(url, opts) {
    this.url = url;
    this.opts = opts;
    this.fetch = opts.fetch ?? fetch;
  }

  /**
   * @template T
   * @param {string} thing 
   * @param {Partial<T>} init 
   * @param {import("./types").Auth} [auth]
   * @returns {Promise<T[]>}
   */
  async create(thing, init, auth) {
    return await this.curd("POST", thing, auth, init);
  }

  /**
   * @template T
   * @param {string} thing 
   * @param {import("./types").Auth} [auth]
   * @returns {Promise<T[]>}
   */
  async select(thing, auth) {
    return await this.curd("GET", thing, auth);
  }

  /**
   * @template T
   * @param {string} thing 
   * @param {import("./types").Auth} [auth]
   * @returns {Promise<T[]>}
   */
  async delete(thing, auth) {
    return await this.curd("DELETE", thing, auth);
  }

  /**
   * @template T
   * @param {string} thing 
   * @param {Partial<T>} patch 
   * @param {import("./types").Auth} [auth]
   * @returns {Promise<T[]>}
   */
  async update(thing, patch, auth) {
    return await this.curd("PATCH", thing, auth, patch);
  }

  /**
   * @private
   * @template T
   * @param {"GET" | "POST" | "DELETE" | "PATCH"} method
   * @param {string} thing 
   * @param {Partial<T>} [data] 
   * @param {import("./types").Auth} [auth]
   * @returns {Promise<T[]>}
   */
  async curd(method, thing, auth, data) {
    const [tab, id] = thing.split(":");
    const [{
      status,
      detail,
      result
    }] = await /** @type {typeof this.do<T[]>} */ (this.do)({
      method,
      path: id ? `/key/${tab}/${id}` : `/key/${tab}`,
      body: data ? JSON.stringify(data) : undefined,
      auth,
    });
    if (status === "ERR") {
      throw detail || (
        typeof result === "string" ? result : "Unexpected error occured."
      );
    }
    if (typeof result === "string") {
      throw "Unexpected error occured.";
    }
    return result;
  }

  /**
   * @template {any[]} T
   * @param {string} sql
   * @param {Record<string, unknown>} vars 
   * @param {import("./types").Auth} [auth]
   * @returns {Promise<T>}
   */
  async query(sql, vars, auth) {
    const res = await this.query_raw(sql, vars, auth)
    // @ts-ignore
    return res.map(({ status, detail, result }) => {
      if (status === "ERR") {
        throw detail ?? result;
      }
      return result;
    });
  }

  /**
   * @param {string} sql
   * @param {Record<string, unknown>} vars 
   * @param {import("./types").Auth} [auth]
   * @returns {Promise<import("./types").Response<any>[]>}
   */
  async query_raw(sql, vars, auth) {
    // NOTE: vars might be nested object.
    const params = Object.fromEntries(
      Object.entries(vars).map(([k, v]) => [
        k,
        typeof v === "string" ? v : JSON.stringify(v),
      ])
    )
    return await /** @type {typeof this.do<any>} */ (this.do)({
      method: "POST",
      path: "/sql",
      body: sql,
      plain_body: true,
      params: new URLSearchParams(params),
      auth,
    });
  }

  /**
   * @private
   * @template T
   * @param {{
   *   method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
   *   path: string,
   *   body?: BodyInit,
   *   plain_body?: boolean,
   *   params?: URLSearchParams,
   *   auth?: import("./types").Auth,
   * }} req
   * @returns {Promise<import("./types").Response<T>[]>}
   */
  async do({ method, path, body, plain_body, params, auth }) {
    auth = auth ?? this.opts.auth;
    const headers = {
      "NS": this.opts.ns,
      "DB": this.opts.db,
      "Authorization": (typeof auth === "string") ?
        this.bearer_token(auth) : this.basic_auth(auth),
      "Content-Type": plain_body ? "text/plain" : "application/json",
      "Accept": "application/json"
    };
    const url = `${this.url}${path}?${params}`;
    const res = await this.fetch(url, {
      method,
      headers,
      body,
    });
    if (!res.ok) {
      throw await res.text()
    }
    return await res.json();
  }

  /**
   * @private 
   * @param {string} auth 
   */
  bearer_token(auth) {
    if (auth.startsWith("Bearer")) {
      return auth;
    }
    return "Bearer " + auth;
  }

  /**
   * @private
   * @param {import("./types").Auth} [auth]
   */
  basic_auth(auth) {
    if (typeof auth === "string") {
      throw "bad auth";
    }
    return `Basic ${btoa(auth?.user + ":" + auth?.pass)}`;
  }
};