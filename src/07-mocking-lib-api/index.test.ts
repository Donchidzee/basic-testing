import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: jest.fn((fn: (...args: any[]) => any) => fn),
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as jest.Mocked<AxiosInstance>;

    const mockedAxiosCreate = axios.create as jest.MockedFunction<
      typeof axios.create
    >;
    mockedAxiosCreate.mockReturnValue(axiosInstance);

    await throttledGetDataFromApi('/posts');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    } as unknown as jest.Mocked<AxiosInstance>;

    const mockedAxiosCreate = axios.create as jest.MockedFunction<
      typeof axios.create
    >;
    mockedAxiosCreate.mockReturnValue(axiosInstance);

    const relativePath = '/posts/1';
    await throttledGetDataFromApi(relativePath);

    expect(axiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const responseData = { id: 1, title: 'Test Post' };
    const axiosInstance = {
      get: jest.fn().mockResolvedValue({ data: responseData }),
    } as unknown as jest.Mocked<AxiosInstance>;

    const mockedAxiosCreate = axios.create as jest.MockedFunction<
      typeof axios.create
    >;
    mockedAxiosCreate.mockReturnValue(axiosInstance);

    const result = await throttledGetDataFromApi('/posts/1');

    expect(result).toEqual(responseData);
  });
});
