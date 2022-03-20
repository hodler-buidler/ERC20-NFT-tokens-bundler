import { SUPPORTED_WALLETS } from '@/config/wallets';

export function isAnyWalletSupported(): boolean {
  const supportedWallets = SUPPORTED_WALLETS.filter((wallet) => wallet.isSupported());
  return !!supportedWallets.length;
}
