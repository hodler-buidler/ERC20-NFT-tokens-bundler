import { Wallet, Chain } from '@/types/app';
import METAMASK_WALLET from '@/logic/wallets/metamask';
import { RINKEBY_TESTNET_CHAIN, ETHEREUM_MAINNET_CHAIN } from '@/logic/chains';

export const SUPPORTED_WALLETS: readonly Wallet[] = Object.freeze([METAMASK_WALLET]);

export const SUPPORTED_CHAINS: readonly Chain[] = Object.freeze([RINKEBY_TESTNET_CHAIN]);

export const MAINNET_CHAINS: readonly Chain[] = Object.freeze([ETHEREUM_MAINNET_CHAIN]);

export const DEFAULT_CHAIN = RINKEBY_TESTNET_CHAIN;

export const METAMASK_REJECTED_TRANSACTION_CODE = 4001;
export const METAMASK_REJECTED_TOKEN_NOT_OWNED_CODE = -32603;
