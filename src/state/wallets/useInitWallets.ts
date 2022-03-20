import { onMounted, watch, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { makeQueryProvider, makeWalletProvider } from '@/logic/ethereum';
import { DEFAULT_CHAIN } from '@/config/wallets';
import {
  isAnyWalletSupported,
  getCurrentChainId,
  isChainIdSupported,
  getChainById,
} from '@/utils/wallets';
import { useWalletsStore } from './useWalletsStore';

export function useInitWallets(): void {
  const walletsStore = useWalletsStore();
  const { isSupportedChainEnabled, connectedAddress } = storeToRefs(walletsStore);
  const ethereum = window?.ethereum;

  onMounted(() => {
    walletsStore.setIsAnyWalletSupported(isAnyWalletSupported());
    walletsStore.setIsEthereumProviderConnected(!!ethereum?.isConnected());

    if (!isAnyWalletSupported()) {
      walletsStore.setQueryProvider(makeQueryProvider(DEFAULT_CHAIN));
    }

    // Window.ethereum object takes time on page load to produce values
    setTimeout(() => {
      walletsStore.setIsSupportedChainEnabled(isChainIdSupported(getCurrentChainId()));
      walletsStore.setConnectedAddress(ethereum?.selectedAddress || '');
      walletsStore.setIsWalletConnecting(false);
      if (isAnyWalletSupported() && isSupportedChainEnabled.value) {
        setGeneralProviderAccordingToCurrentChain();
      }
    }, 1000);
  });

  watch(isSupportedChainEnabled, () => {
    if (isAnyWalletSupported()) {
      if (isSupportedChainEnabled.value) {
        setGeneralProviderAccordingToCurrentChain();
      } else {
        walletsStore.setQueryProvider(null);
      }
    }
  });

  watch(connectedAddress, () => {
    const provider = connectedAddress.value ? makeWalletProvider() : null;
    walletsStore.setWalletProvider(provider);
  });

  onMounted(() => {
    ethereum?.on('connect', handleConnect);
    ethereum?.on('disconnect', handleDisconnect);
    ethereum?.on('accountsChanged', handleAccountsChanged);
    ethereum?.on('chainChanged', handleChainChanged);
  });

  onUnmounted(() => {
    ethereum?.removeListener('connect', handleConnect);
    ethereum?.removeListener('disconnect', handleDisconnect);
    ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    ethereum?.removeListener('chainChanged', handleChainChanged);
  });

  function handleConnect() {
    walletsStore.setIsEthereumProviderConnected(!!ethereum?.isConnected());
  }

  function handleDisconnect() {
    walletsStore.setIsEthereumProviderConnected(false);
  }

  function handleAccountsChanged(accounts: string[]) {
    walletsStore.setConnectedAddress(accounts[0] || '');
  }

  function handleChainChanged(chainId: string) {
    walletsStore.setIsSupportedChainEnabled(isChainIdSupported(chainId));
  }

  function setGeneralProviderAccordingToCurrentChain(): void {
    const enabledChain = getChainById(getCurrentChainId());
    if (!enabledChain) return;
    const provider = makeQueryProvider(enabledChain);
    walletsStore.setQueryProvider(provider);
  }
}
