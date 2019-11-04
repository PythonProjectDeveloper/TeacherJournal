import initTeacherRoutes from './teachers';
import initStudentRoutes from './students';
import initSubjectRoutes from './subjects';
import initJournalRoutes from './journals';
import initExportRoutes from './export';
import initStatisticRoutes from './statistic';
import { Router } from 'express';

export default function initRoutes(database: any): Router {
  const router: Router = Router();

  initTeacherRoutes(router, database);
  initStudentRoutes(router, database);
  initSubjectRoutes(router, database);
  initJournalRoutes(router, database);
  initExportRoutes(router, database);
  initStatisticRoutes(router, database);

  return router;
}
