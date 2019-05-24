import jwt = require("jsonwebtoken");
import { IJWT } from "./types";

export interface IJWTConfig {
  JWT_PUBLIC_KEY: string;
  verifyOptions: object;
}

let config: IJWTConfig;

export function init(c: IJWTConfig) {
  if (!config) {
    config = c;
  } else {
    throw "JWT config has already been initialized.";
  }
}

export type IVerifyResult =
  | {
      valid: false;
    }
  | {
      valid: true;
      value: IJWT;
    };

export function verify(token: string): IVerifyResult {
  try {
    return {
      valid: true,
      value: jwt.verify(token, config.JWT_PUBLIC_KEY) as any
    };
  } catch {
    return { valid: false };
  }
}
