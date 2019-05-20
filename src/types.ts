export interface IItemPermission {
  owner: string;
  group: string;
  permissions: string[];
  childPermissions: string[];
}

export interface IFileTreePermission<T extends Exclude<string, "_"> {
  _: IItemPermission;
  [key: T]: IFileTreePermission<string>;
}

export interface IPermissionConfig {
  root: string;
  defaultDocs: string[];
  superuser: string[];
  acl: IFileTreePermission;
}

export interface IToken {
  token: string;
  value: string;
}

export type IJWT = {
  username: string;
  roles: string[];
  tokens: IToken[];
};
