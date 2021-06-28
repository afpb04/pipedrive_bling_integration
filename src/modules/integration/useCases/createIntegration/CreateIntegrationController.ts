import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateIntegrationUseCase from './CreateIntegrationUseCase';

class CreateIntegrationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createIntegrationUseCase = container.resolve(
      CreateIntegrationUseCase,
    );
    await createIntegrationUseCase.execute();
    return response.status(201).json({ success: true });
  }
}
export default CreateIntegrationController;
