import { ethers } from 'ethers';
import { Chain, BaseProvider, Web3Provider } from '@/types/app';

export function makeQueryProvider(chain: Chain): BaseProvider {
  return new ethers.providers.InfuraProvider(chain.endpoint, process.env.VUE_APP_INFURA_PROJECT_ID);
}

export function makeWalletProvider(): Web3Provider {
  return new ethers.providers.Web3Provider(window.ethereum!, 'any') as Web3Provider;
}
