import { IRoleConfig, IResourceConfig } from "../types";

export interface IConfig {
  root: string;
  public: IResourceConfig;
  roles: {
    [key: string]: IResourceConfig;
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
