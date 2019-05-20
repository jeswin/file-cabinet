import { IPermissionConfig, IToken, IFileTreePermission, IFilePermission } from "./types";

function getResourceName(res: string) {
  return res === "" ? "/" : res;
}

function getTokenString(token: string, value: string) {
  return `${token}=${value}`;
}

export default function getPermissions(
  resource: string,
  tokens: IToken[],
  config: IPermissionConfig
) {
  const isSuperUser = tokens.some(x =>
    config.superuser.some(s => getTokenString(x.token, x.value) === s)
  );

  return isSuperUser
    ? "rwx"
    : (() => {
      const resourceName = getResourceName(resource);
      const parts = resourceName.split("/").slice(1);
      const permissions = (function loop(parts: string[], acl: IFileTreePermission) {
        const [first, ...rest] = parts;
        const partACL = acl[first];
        const permission = partACL._
        const isOwner = permission.
      })(parts, config.acl)
    })()
  
}
