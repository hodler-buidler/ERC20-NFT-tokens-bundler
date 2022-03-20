import { ChainId } from '@/types/app';
import { SUPPORTED_CHAINS } from '@/config/wallets';

export function isChainIdSupported(chainId: unknown): boolean {
  return !!SUPPORTED_CHAINS.find((chain) => chain.id === (chainId as ChainId));
}
