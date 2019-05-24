import {
  IAppConfig,
  ICollectionConfiguration as INodeConfiguration,
  IJWT,
  ICollectionConfiguration,
  IAccessPermission
} from "./types";
import { join } from "path";
import { lstat as lstatCallback } from "fs";
import { promisify } from "util";

const lstat = promisify(lstatCallback);

function getResourceParts(res: string) {
  const fixEmpty = res === "" ? "/" : res;

  const fixPrefix = fixEmpty.startsWith("/") ? res : `/${res}`;

  return fixPrefix.endsWith("/")
    ? fixPrefix.split("/").slice(1, -1)
    : fixPrefix.split("/").slice(1);
}

function getTokenString(token: string, value: string) {
  return `${token}=${value}`;
}

export interface IGetPermissionResult {
  r: boolean;
  w: boolean;
  x: boolean;
}

function hasToken(token: string, jwt: object): boolean {
  return Object.entries(jwt).some(([k, v]) => getTokenString(k, v) === token);
}

function getNodePermissions(
  perms: IAccessPermission,
  jwt: object
): IGetPermissionResult {
  const hasPermission = (list?: string[]) =>
    list ? list.some(x => hasToken(x, jwt)) || list.includes("*") : false;

  return {
    r: hasPermission(perms.r),
    w: hasPermission(perms.w),
    x: hasPermission(perms.x)
  };
}

async function isInRootDirectory(parts: string[], config: IAppConfig) {
  if (parts.length > 1) {
    return false;
  }
  // Check if it's a file.
  const fullPath = join(config.root, parts[0]);
  const stat = await lstat(fullPath);
  return stat.isFile();
}

export default function getPermissions(
  resource: string,
  jwt: IJWT,
  config: IAppConfig
) {
  const isSuperUser = hasToken(config.superuser, jwt);

  return isSuperUser
    ? { r: true, w: true, x: true }
    : (() => {
        const parts = getResourceParts(resource);
        return isInRootDirectory(parts, config)
          ? getNodePermissions(config.app.access, jwt)
          : (function loop(
              currentPermissions: IGetPermissionResult,
              parts: string[],
              config: ICollectionConfiguration
            ): IGetPermissionResult {
              const [first, ...rest] = parts;
              return rest.length // is not last item?
                ? !config.children[first] // path missing in config?
                  ? currentPermissions
                  : loop(
                      config.children[first].childAccess // child acc defined?
                        ? getNodePermissions(
                            config.children[first].childAccess,
                            jwt
                          )
                        : currentPermissions,
                      rest,
                      config.children[first]
                    )
                : currentPermissions;
            })(
              getNodePermissions(config.app.childAccess, jwt),
              parts,
              config.app
            );
      })();
}
