import { ethers } from 'ethers';
import { BaseProvider } from '@/types/app';
import ERC1155ABI from '@/abis/tokens-bundler.json';

function makeContract(provider: BaseProvider, address: string) {
  return new ethers.Contract(address, ERC1155ABI, provider);
}

export default makeContract;
