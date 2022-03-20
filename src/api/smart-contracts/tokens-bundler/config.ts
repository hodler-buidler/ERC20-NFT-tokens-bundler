import { ChainId } from '@/types/app';

export const CONTRACT_ADDRESSES_MAP: { [key in ChainId]?: string } = Object.freeze({
  [ChainId.RinkebyTest]: '0x8a2148aFEBF4E7A01AaFA38066d4E65fe36036fC',
});

export const DEFAULT_TESTNET_CONTRACT_ADDRESS = CONTRACT_ADDRESSES_MAP[
  ChainId.RinkebyTest
] as string;
export const DEFAULT_MAINNET_CONTRACT_ADDRESS = '';
