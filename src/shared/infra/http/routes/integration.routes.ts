import { Router } from 'express';

import CreateIntegrationController from '../../../../modules/integration/useCases/createIntegration/CreateIntegrationController';

const integrationRoutes = Router();

const createIntegrationController = new CreateIntegrationController();

integrationRoutes.post('/', createIntegrationController.handle);

export default integrationRoutes;
