import { OPENAI_KEY, OPENAI_URL } from "$env/static/private";
import OpenAI from "openai";

export const ai = new OpenAI({
  baseURL: OPENAI_URL,
  apiKey: OPENAI_KEY,
});

