import axios, { AxiosResponse } from 'axios';

import AppError from '../../../../errors/AppError';
import { IApiProvider, IGetRequest, IPostRequest } from '../IApiProvider';

class AxiosProvider implements IApiProvider {
  async get({
    path,
    error_message,
    params,
  }: IGetRequest): Promise<AxiosResponse> {
    try {
      const response = await axios.get(path, {
        params,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      throw new AppError(
        `${error_message} - Error externo: ${err.response.data.error} `,
      );
    }
  }
  async post({
    path,
    error_message,
    params,
  }: IPostRequest): Promise<AxiosResponse> {
    try {
      const response = await axios.post(
        path,
        {},
        {
          params,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (err) {
      throw new AppError(
        `${error_message} - Error externo: ${err.response.data.error} `,
      );
    }
  }
}
export default AxiosProvider;
