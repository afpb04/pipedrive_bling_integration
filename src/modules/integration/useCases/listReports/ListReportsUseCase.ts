import { inject, injectable } from 'tsyringe';

import Report from '../../infra/typeorm/schemas/Report';
import IReportsRepository from '../../repositories/IReportsRepository';

@injectable()
class ListReportsUseCase {
  constructor(
    @inject('ReportRepository')
    private reportRepository: IReportsRepository,
  ) {}
  async execute(): Promise<Report[]> {
    const reports = await this.reportRepository.listAll();
    return reports;
  }
}

export default ListReportsUseCase;
