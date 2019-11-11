import { initPersonEvents } from './person';
import { initSubjectEvents } from './subject';

export function initSchemaEvents(): void {
  initPersonEvents();
  initSubjectEvents();
}
