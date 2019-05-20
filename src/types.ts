export interface IFilePermission {
  owner: string;
  group: string;
  permissions: string[];
  childPermissions: string[];
}

export interface IFileTreePermission {
  [key: string]: IFileTreePermission;
  "@": IFileTreePermission;
}

export interface IPermissionConfig {
  root: string;
  defaultDocs: string[];
  superuser: string[];
  acl: {
    "@": {
      owner: "ops=devops";
      permissions: ["rw", "", "r"];
      childPermissions: [];
    };
    courses: {
      "@": {
        group: ["tufts-team", "reliance-team"];
        permissions: "---r-----";
      };
      exercises: {};
    };
  };
}

export interface IResourcePermissions {
  [key: string]: string;
}

export type TokenValue = {
  username: string;
  roles: string[];
  tokens: IResourcePermissions;
};
