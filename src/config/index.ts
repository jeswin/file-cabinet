import { IPermissionConfig } from "../types";

export interface IConfig {
  root: string;
  public: IPermissionConfig;
  permissions: {
    [key: string]: IPermissionConfig;
  };
}

let config: IConfig;

export function init(c: IConfig) {
  config = {
    ...c,
    root: c.root.endsWith("/") ? c.root : `${c.root}/`
  };
}

export function get(): IConfig {
  return config;
}
