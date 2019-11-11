import chalk, { Chalk, ColorSupport } from 'chalk';

export const connected: Chalk & { supportsColor: ColorSupport; } = chalk.bold.cyan;
export const error: Chalk & { supportsColor: ColorSupport; } = chalk.bold.yellow;
export const disconnected: Chalk & { supportsColor: ColorSupport; } = chalk.bold.red;
export const termination: Chalk & { supportsColor: ColorSupport; } = chalk.bold.magenta;
