interface IGetRequest {
  path: string;
  error_message: string;
  params?: any;
}
interface IPostRequest {
  path: string;
  error_message: string;
  params?: any;
}

interface IApiProvider {
  get({ path, error_message, params }: IGetRequest): Promise<any>;
  post({ path, error_message, params }: IPostRequest): Promise<any>;
}
export { IApiProvider, IGetRequest, IPostRequest };
