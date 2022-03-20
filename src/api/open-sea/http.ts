import axios, { AxiosInstance } from 'axios';
import { isTestnetChainId } from '@/utils/wallets';
import { DEFAULT_CHAIN } from '@/config/wallets';
import { MAINNET_BASE_URL, TESTNET_BASE_URL } from './config';
import { HttpFactoryParams } from './types';

function http({ chainId = DEFAULT_CHAIN.id }: HttpFactoryParams): AxiosInstance {
  const baseURL = isTestnetChainId(chainId) ? TESTNET_BASE_URL : MAINNET_BASE_URL;
  return axios.create({ baseURL });
}

export default http;
