export interface ILog {
  typeHttpQuery: TypeHttpQuery;
  url: string;
  description?: any;
}

export enum TypeHttpQuery {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
