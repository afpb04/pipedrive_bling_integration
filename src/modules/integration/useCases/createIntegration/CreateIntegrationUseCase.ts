import { inject, injectable } from 'tsyringe';

import { IApiProvider } from '../../../../shared/container/providers/apiProvider/IApiProvider';
import xmlParse from '../../../../utils/xmlParse';
import IReportsRepository from '../../repositories/IReportsRepository';

@injectable()
class CreateIntegrationUseCase {
  constructor(
    @inject('AxiosProvider')
    private axiosProvider: IApiProvider,
    @inject('ReportRepository')
    private reportRepository: IReportsRepository,
  ) {}
  async execute(): Promise<void> {
    const params = {
      api_token: process.env.PIPEDRIVE_TOKEN,
      status: 'won',
    };

    const { data } = await this.axiosProvider.get({
      path: `${process.env.PIPEDRIVE_URL}/deals`,
      error_message: 'Não foi possível recuperar os dados',
      params,
    });

    const reportExist = await this.reportRepository.findByDate(
      new Date().toISOString(),
    );
    if (!reportExist) {
      const report = await this.reportRepository.create({ amount: 0 });

      data.map(async deals => {
        const xml = xmlParse({
          nome: deals.person_name,
          codigo: deals.id,
          descricao: deals.title,
          vlr_unit: deals.weighted_value,
        });

        const { retorno } = await this.axiosProvider.post({
          path: `${process.env.BLING_URL}`,
          error_message: 'Não foi possível inserir os dados',
          params: { xml, apikey: process.env.BLING_TOKEN },
        });

        if (!retorno.erros) {
          report.amount += deals.weighted_value;
          await this.reportRepository.update(report);
        }
      });
    }

    data.map(async deals => {
      const xml = xmlParse({
        nome: deals.person_name,
        codigo: deals.id,
        descricao: deals.title,
        vlr_unit: deals.weighted_value,
      });

      const { retorno } = await this.axiosProvider.post({
        path: `${process.env.BLING_URL}`,
        error_message: 'Não foi possível inserir os dados',
        params: { xml, apikey: process.env.BLING_TOKEN },
      });

      if (!retorno.erros) {
        reportExist.amount += deals.weighted_value;
        await this.reportRepository.update(reportExist);
      }
    });
  }
}
export default CreateIntegrationUseCase;
