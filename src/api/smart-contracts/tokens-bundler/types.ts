import { ChainId, Web3Provider } from '@/types/app';
import { MultiTokenAsset } from '../types';

export interface ContractParams {
  chainId?: ChainId;
}

export interface WrapTokensCallParams {
  provider: Web3Provider;
  assets: MultiTokenAsset[];
}

export interface UnwrapTokensCallParams {
  provider: Web3Provider;
  tokenId: string;
}
