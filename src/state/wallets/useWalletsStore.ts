import { defineStore } from 'pinia';
import { BaseProvider, Web3Provider } from '@/types/app';

export interface WalletsState {
  isAnyWalletSupported: boolean;
  connectedAddress: string;
  isEthereumProviderConnected: boolean;
  isWalletConnecting: boolean;
  isSupportedChainEnabled: boolean;
  queryProvider: BaseProvider | null;
  walletProvider: Web3Provider | null;
  transactionsCounter: number;
  isPerformingTransaction: boolean;
}

export const useWalletsStore = defineStore('wallets', {
  state: (): WalletsState => ({
    isAnyWalletSupported: true,
    isEthereumProviderConnected: false,
    connectedAddress: '',
    isWalletConnecting: true,
    isSupportedChainEnabled: true,
    queryProvider: null,
    walletProvider: null,
    transactionsCounter: 0,
    isPerformingTransaction: false,
  }),
  getters: {
    isWalletConnected(state): boolean {
      return !!state.connectedAddress;
    },
  },
  actions: {
    setIsWalletConnecting(isConnecting: boolean) {
      this.isWalletConnecting = isConnecting;
    },

    setIsAnyWalletSupported(isAnyWalletSupported: boolean) {
      this.isAnyWalletSupported = isAnyWalletSupported;
    },

    setIsSupportedChainEnabled(isEnabled: boolean) {
      this.isSupportedChainEnabled = isEnabled;
    },

    setConnectedAddress(address: string) {
      this.connectedAddress = address;
    },

    setQueryProvider(provider: BaseProvider | null) {
      this.queryProvider = provider;
    },

    setWalletProvider(provider: Web3Provider | null) {
      this.walletProvider = provider;
    },

    incrementTransactionsCounter() {
      this.transactionsCounter += 1;
    },

    setIsPerformingTransaction(isPerforming: boolean) {
      this.isPerformingTransaction = isPerforming;
    },

    setIsEthereumProviderConnected(isConnected: boolean) {
      this.isEthereumProviderConnected = isConnected;
    },

    async connectWallet(): Promise<void> {
      const ethereum = window?.ethereum;

      try {
        this.setIsWalletConnecting(true);
        await ethereum?.request({ method: 'eth_requestAccounts' });
      } catch (err) {
      } finally {
        this.setIsWalletConnecting(false);
      }
    },
  },
});
