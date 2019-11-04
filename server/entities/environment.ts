export interface IEnvironment {
  production: boolean;
  port: number;
  database: {
    url: string;
    name: string;
    port: number;
  };
}
