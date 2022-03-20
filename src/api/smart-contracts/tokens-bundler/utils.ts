import { ChainId } from '@/types/app';
import {
  CONTRACT_ADDRESSES_MAP,
  DEFAULT_TESTNET_CONTRACT_ADDRESS,
  DEFAULT_MAINNET_CONTRACT_ADDRESS,
} from './config';
import { isTestnetChainId } from '@/utils/wallets';

export function getTokensBundlerContractAddress(chainId: ChainId): string {
  if (CONTRACT_ADDRESSES_MAP[chainId]) {
    return CONTRACT_ADDRESSES_MAP[chainId] as string;
  }

  if (isTestnetChainId(chainId)) return DEFAULT_TESTNET_CONTRACT_ADDRESS;
  return DEFAULT_MAINNET_CONTRACT_ADDRESS;
}
