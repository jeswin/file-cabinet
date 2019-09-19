import jwt = require("jsonwebtoken");
import { IJWT } from "./types";

export interface IJWTConfig {
  publicKey: string;
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
      value: jwt.verify(token, config.publicKey) as any
    };
  } catch {
    return { valid: false };
  }
}
