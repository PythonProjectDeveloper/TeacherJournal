import { ILog } from '../entities/log';
import { HttpErrorResponse } from '@angular/common/http';

export class Log implements ILog {
  public name: string;
  public message: string;
  public error: any;
  public headers: any;

  constructor({ name, message, error, headers }: HttpErrorResponse) {
    this.name = name;
    this.message = message;
    this.error = error;
    this.headers = headers;
  }

  public printError(): void {
    console.error(this.message);
  }
}
