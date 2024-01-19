import { OPENAI_KEY, OPENAI_URL } from "$env/static/private";
import OpenAI from "openai";
import jwt from "jsonwebtoken";

/**
 * @typedef {{
 *   adapt: (c: OpenAI) => OpenAI
 * }} Adaptor
 */

/** @implements {Adaptor} */
class AdaptorAuto {

  /**
   * @param {OpenAI} client  
   * @returns {OpenAI}
   */
  adapt(client) {
    const base_url = client.baseURL;
    if (base_url.includes("bigmodel.cn")) {
      return (new AdaptorZhipu()).adapt(client);
    }
    return client;
  }
}

/** @implements {Adaptor} */
class AdaptorZhipu {

  /**
   * @param {OpenAI} client  
   * @returns {OpenAI}
   */
  adapt(client) {
    // we just need to simply rewrite the API Key.
    client.apiKey = this.generate_token(client.apiKey);
    return client;
  }

  /**
   * @private
   * @param {string} api_key 
   * @returns 
   */
  generate_token(api_key) {
    const [id, secret] = api_key.split(".");
    if (!id || !secret) {
      throw new Error(
        `[adaptor-zhipu] Bad API Key: ${api_key}`
      );
    }

    const forever = 60 * 60 * 24 * 36500;  // almost 100 years in seconds
    const now = (new Date()).getTime();
    const claims = {
      api_key: id,
      timestamp: now,
      exp: now + forever * 1000,
    }
    // @ts-ignore
    const token = jwt.sign(claims, secret, {
      algorithm: "HS256",
      header: {
        alg: "HS256",
        sign_type: "SIGN"  // this sucks :(  
      }                    // actually a token built on an API Key sucks.
    });
    return token;
  }
}


const adaptor = new AdaptorAuto();

export const ai = adaptor.adapt(new OpenAI({
  baseURL: OPENAI_URL,
  apiKey: OPENAI_KEY,
}));
