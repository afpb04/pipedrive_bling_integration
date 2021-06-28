import { Router } from 'express';

import ListReportsController from '../../../../modules/integration/useCases/listReports/ListReportsController';

const reportRoutes = Router();

const listReportsController = new ListReportsController();

reportRoutes.get('/', listReportsController.handle);

export default reportRoutes;
