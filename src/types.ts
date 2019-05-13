export interface IRoleConfig {
  [key: string]: {
    eval: AccessEvalFunction;
    dirs: string[];
    ignore: string[];
  };
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
  permissions: {
    resource: string;
    value: string;
  }[];
};
