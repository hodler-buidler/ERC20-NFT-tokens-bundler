import { ChainId, Chain } from '@/types/app';
import { SUPPORTED_CHAINS } from '@/config/wallets';

export function getChainById(chainId: unknown): Chain | null {
  return SUPPORTED_CHAINS.find((chain) => chain.id === (chainId as ChainId)) || null;
}
