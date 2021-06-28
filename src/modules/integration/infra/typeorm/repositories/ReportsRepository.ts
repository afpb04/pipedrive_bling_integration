import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateReportDTO from '../../../dtos/ICreateReportDTO';
import IReportsRepository from '../../../repositories/IReportsRepository';
import Report from '../schemas/Report';

class ReportRepository implements IReportsRepository {
  private repository: MongoRepository<Report>;

  constructor() {
    this.repository = getMongoRepository(Report);
  }
  async create({ amount }: ICreateReportDTO): Promise<Report> {
    const report = this.repository.create({
      amount,
    });
    await this.repository.save(report);
    return report;
  }
  async findById(id: string): Promise<Report> {
    const report = await this.repository.findOne(id);
    return report;
  }
  async findByDate(date: string): Promise<Report> {
    const [parseDate] = date.split('T');

    const report = await this.repository.findOne({
      where: {
        created_at: {
          $gte: new Date(`${parseDate}T00:00:00Z`),
          $lt: new Date(`${parseDate}T23:59:59Z`),
        },
      },
    });
    return report;
  }
  async update({ amount, id }: ICreateReportDTO): Promise<Report> {
    const report = this.repository.create({
      id,
      amount,
    });
    await this.repository.save(report);
    return report;
  }
  async listAll(): Promise<Report[]> {
    const reports = await this.repository.find();
    return reports;
  }
}

export default ReportRepository;
