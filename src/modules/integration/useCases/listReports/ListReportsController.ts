import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListReportsUseCase from './ListReportsUseCase';

class ListReportsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listReportsUseCase = container.resolve(ListReportsUseCase);
    const reports = await listReportsUseCase.execute();
    return response.json({ success: true, reports });
  }
}

export default ListReportsController;
