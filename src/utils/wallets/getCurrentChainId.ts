import { ChainId } from '@/types/app';

export function getCurrentChainId(): ChainId | null {
  return (window?.ethereum?.chainId as ChainId) || null;
}
