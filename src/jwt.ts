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

/*
  verify: (token, $Option) => {
    vOption = {
      issuer: "Authorization/Resource/This server",
      subject: "iam@user.me",
      audience: "Client_Identity" // this should be provided by client
    };
    var verifyOptions = {
      issuer: $Option.issuer,
      subject: $Option.subject,
      audience: $Option.audience,
      expiresIn: "30d",
      algorithm: ["RS256"]
    };
    try {
      return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
      return false;
    }
  },
  decode: token => {
    return jwt.decode(token, { complete: true });
    //returns null if token is invalid
  }
*/
