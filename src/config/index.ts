import { IAppConfig } from "../types";

let config: IAppConfig;

function fixDirectoryPath(dir: string) {
  const fixEmpty = dir === "" || typeof dir === "undefined" ? "/" : dir;
  
  const fixPrefix = fixEmpty.startsWith("/") ? fixEmpty : `/${fixEmpty}`;

  return fixPrefix.endsWith("/")
    ? fixPrefix.split("/").slice(1, -1)
    : fixPrefix.split("/").slice(1);
}

export function init(c: IAppConfig) {
  config = {
    ...c,
    root: c.root.endsWith("/") ? c.root : `${c.root}/`
  };
}

export function get(): IAppConfig {
  return config;
}
