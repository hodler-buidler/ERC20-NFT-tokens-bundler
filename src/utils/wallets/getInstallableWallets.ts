import { Wallet } from '@/types/app';
import { SUPPORTED_WALLETS } from '@/config/wallets';

export function getInstallableWallets(): Wallet[] {
  return SUPPORTED_WALLETS.filter((wallet) => wallet.installable);
}
