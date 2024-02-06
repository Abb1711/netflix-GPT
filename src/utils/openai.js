import { OPENAI_KEY } from "./constants";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || OPENAI_KEY,
  dangerouslyAllowBrowser: true
});

export default openai;
