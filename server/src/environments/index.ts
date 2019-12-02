import { environment as devEnvironment } from './dev';
import { environment as prodEnvironment } from './prod';
import { IEnvironment } from '../entities/environment';

export function loadConfigData(): IEnvironment {
  const env: string = process.env.NODE_ENV || 'dev';

  return env === 'dev' ? devEnvironment : prodEnvironment;
}

export const config: IEnvironment = loadConfigData();
