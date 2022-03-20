import { MAINNET_CHAINS } from '@/config/wallets';

export function isMainnetChainId(chainId: unknown): boolean {
  return !!MAINNET_CHAINS.find((chain) => chain.id === chainId);
}
