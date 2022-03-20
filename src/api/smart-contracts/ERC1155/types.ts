import { Web3Provider, BaseProvider } from '@/types/app';
import { MultiTokenAsset } from '../types';

export interface SetApprovalForAllCallParams {
  provider: Web3Provider;
  asset: MultiTokenAsset;
  toAddress: string;
}

export interface IsApprovedForAllQueryParams {
  provider: BaseProvider;
  holderAddress: string;
  spenderAddress: string;
  assetAddress: string;
}
