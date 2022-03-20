import { WalletType, Wallet } from '@/types/app';
import METAMASK_LOGO from '@/assets/images/metamask-logo.svg';

const metamaskWallet: Wallet = Object.freeze({
  type: WalletType.MetaMask,
  name: 'MetaMask',
  logo: METAMASK_LOGO,
  installable: true,
  installLink: 'https://metamask.io/download',
  isSupported() {
    return !!window && !!window?.ethereum?.isMetaMask;
  },
});

export default metamaskWallet;
