export interface IResourceConfig {
  dirs: string[];
  ignore: string[];
  canAccessRoot?: boolean;
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
