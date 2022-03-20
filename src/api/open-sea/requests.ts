import { HttpFactoryParams, FetchAssetsParams, FetchAssetsResponse } from './types';
import http from './http';

export async function fetchAssets(
  requestParams: FetchAssetsParams = {},
  httpParams: HttpFactoryParams = {},
): Promise<FetchAssetsResponse> {
  const { data } = await http(httpParams).get<FetchAssetsResponse>('assets', {
    params: requestParams,
  });
  return data;
}
