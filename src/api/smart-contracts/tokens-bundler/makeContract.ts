import { ethers } from 'ethers';
import { BaseProvider } from '@/types/app';
import { DEFAULT_CHAIN } from '@/config/wallets';
import tokensBundlerABI from '@/abis/tokens-bundler.json';
import { ContractParams } from './types';
import { getTokensBundlerContractAddress } from './utils';

function makeContract(provider: BaseProvider, { chainId = DEFAULT_CHAIN.id }: ContractParams) {
  return new ethers.Contract(getTokensBundlerContractAddress(chainId), tokensBundlerABI, provider);
}

export default makeContract;
