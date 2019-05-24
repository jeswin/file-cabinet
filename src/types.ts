export interface IAccessPermission {
  r?: string[];
  w?: string[];
  x?: string[];
}

export interface ICollectionConfiguration {
  access: IAccessPermission;
  autoIndex: boolean;
  alias: string;
  children: {
    [key: string]: ICollectionConfiguration;
  };
}

export interface IAppConfig {
  root: string;
  defaultDocs: string[];
  superuser: string;
  authServer: {
    publicKey: string;
  };
  app: ICollectionConfiguration;
}

export type IJWT = {
  [key: string]: string;
};
