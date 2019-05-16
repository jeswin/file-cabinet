export interface IAllowDirectoryListing {
  allow: true,
  excludeDisallowed:  boolean
}

export interface IDisallowDirectoryListing {
  allow: false
}

export interface IDirConfig {
  directoryListing?: IAllowDirectoryListing | IDisallowDirectoryListing,
  pattern?: {
    type: "include" | "exclude",
    value: string[]
  }
}

export interface IPermissionConfig {
  dirs: {
    [key: string]: IDirConfig;
  };
  root: IDirConfig;
}

export type AccessEvalFunction = (args: {
  username: string;
  permissions: {
    resource: string;
    value: string;
  }[];
  root: string;
  path: string;
}) => boolean;

export type TokenValue = {
  username: string;
  roles: string[];
  permissions: {
    resource: string;
    value: string;
  }[];
};
