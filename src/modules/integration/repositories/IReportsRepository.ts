import ICreateReportDTO from '../dtos/ICreateReportDTO';
import Report from '../infra/typeorm/schemas/Report';

interface IReportsRepository {
  create({ amount }: ICreateReportDTO): Promise<Report>;
  findById(id: string): Promise<Report>;
  listAll(): Promise<Report[]>;
  findByDate(date: string): Promise<Report>;
  update({ amount, id }: ICreateReportDTO): Promise<Report>;
}

export default IReportsRepository;
