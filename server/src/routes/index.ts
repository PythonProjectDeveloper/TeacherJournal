import initTeacherRoutes from './teachers';
import initStudentRoutes from './students';
import initSubjectRoutes from './subjects';
import initJournalRoutes from './journals';
import initExportRoutes from './export';
import initStatisticRoutes from './statistic';
import initWidgetRoutes from './widgets';
import initLogRoutes from './logs';
import { Router } from 'express';

export default function initRoutes(): Router {
  const router: Router = Router();

  initTeacherRoutes(router);
  initStudentRoutes(router);
  initSubjectRoutes(router);
  initJournalRoutes(router);
  initExportRoutes(router);
  initWidgetRoutes(router);
  initLogRoutes(router);
  initStatisticRoutes(router);

  return router;
}
