import { Router } from 'express';

import integrationRoutes from './integration.routes';
import reportRoutes from './report.routes';

const routes = Router();

routes.use('/integration', integrationRoutes);
routes.use('/reports', reportRoutes);

export default routes;
