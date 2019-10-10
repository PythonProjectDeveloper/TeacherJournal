import { ILog, TypeHttpQuery } from '../entities/log';

export class Log implements ILog {
  public typeHttpQuery: TypeHttpQuery;
  public url: string;
  public description?: any;

  constructor(typeHttpQuery: TypeHttpQuery, url: string, description?: any) {
    this.typeHttpQuery = typeHttpQuery;
    this.url = url;
    this.description = description;
  }

  public printError(): void {
    console.error(`Error: typeHttpQuery: ${this.typeHttpQuery} url: ${this.url}`, this.description.toString());
  }
}
