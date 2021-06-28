import { container } from 'tsyringe';

import ReportRepository from '../../modules/integration/infra/typeorm/repositories/ReportsRepository';
import IReportsRepository from '../../modules/integration/repositories/IReportsRepository';
import { IApiProvider } from './providers/apiProvider/IApiProvider';
import AxiosProvider from './providers/apiProvider/implementations/AxiosProvider';

container.registerSingleton<IApiProvider>('AxiosProvider', AxiosProvider);
container.registerSingleton<IReportsRepository>(
  'ReportRepository',
  ReportRepository,
);
