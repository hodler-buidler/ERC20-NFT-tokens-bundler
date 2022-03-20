import { defineStore, storeToRefs } from 'pinia';
import {
  DEFAULT_CHAIN,
  METAMASK_REJECTED_TRANSACTION_CODE,
  METAMASK_REJECTED_TOKEN_NOT_OWNED_CODE,
} from '@/config/wallets';
import { MultiTokenAsset } from '@/api/smart-contracts';
import { setApprovalForAll } from '@/api/smart-contracts/ERC1155';
import {
  getTokensBundlerContractAddress,
  wrapTokens,
  unwrapTokens,
} from '@/api/smart-contracts/tokens-bundler';
import { getCurrentChainId } from '@/utils/wallets';
import { Web3Provider } from '@/types/app';
import { useWalletsStore } from '../wallets';
import { useAppStore } from '../app';

export const useTokensBundlerStore = defineStore('tokens-bundler', {
  actions: {
    async approveAsset(asset: MultiTokenAsset): Promise<void> {
      const appStore = useAppStore();
      const walletsStore = useWalletsStore();
      const { walletProvider } = storeToRefs(walletsStore);

      try {
        walletsStore.setIsPerformingTransaction(true);
        if (!walletProvider.value) throw new Error();

        await setApprovalForAll({
          provider: walletProvider.value as Web3Provider,
          asset,
          toAddress: getTokensBundlerContractAddress(getCurrentChainId() || DEFAULT_CHAIN.id),
        });
      } catch (err) {
        if ((err as any)?.code !== METAMASK_REJECTED_TRANSACTION_CODE) {
          appStore.showMessage({
            type: 'error',
            title: `Failed to dispatch transaction, try again`,
          });
        }
      } finally {
        walletsStore.setIsPerformingTransaction(false);
      }
    },

    async wrapAssets(assets: MultiTokenAsset[]): Promise<void> {
      const appStore = useAppStore();
      const walletsStore = useWalletsStore();
      const { walletProvider } = storeToRefs(walletsStore);

      try {
        walletsStore.setIsPerformingTransaction(true);
        if (!walletProvider.value) throw new Error();

        await wrapTokens(
          {
            provider: walletProvider.value as Web3Provider,
            assets,
          },
          {
            chainId: getCurrentChainId() || DEFAULT_CHAIN.id,
          },
        );
      } catch (err) {
        if ((err as any)?.code === METAMASK_REJECTED_TOKEN_NOT_OWNED_CODE) {
          appStore.showMessage({
            type: 'error',
            title: `You don't own this token, wait for OpenSea API update`,
          });
        } else if ((err as any)?.code !== METAMASK_REJECTED_TRANSACTION_CODE) {
          appStore.showMessage({
            type: 'error',
            title: `Failed to dispatch transaction, try again`,
          });
        }
      } finally {
        walletsStore.setIsPerformingTransaction(false);
      }
    },

    async unwrapTokens(tokenId: string): Promise<void> {
      const appStore = useAppStore();
      const walletsStore = useWalletsStore();
      const { walletProvider } = storeToRefs(walletsStore);

      try {
        walletsStore.setIsPerformingTransaction(true);
        if (!walletProvider.value) throw new Error();

        unwrapTokens(
          {
            provider: walletProvider.value as Web3Provider,
            tokenId,
          },
          {
            chainId: getCurrentChainId() || DEFAULT_CHAIN.id,
          },
        );
      } catch (err) {
        if ((err as any)?.code === METAMASK_REJECTED_TOKEN_NOT_OWNED_CODE) {
          appStore.showMessage({
            type: 'error',
            title: `You don't own this token, wait for OpenSea API update`,
          });
        } else if ((err as any)?.code !== METAMASK_REJECTED_TRANSACTION_CODE) {
          appStore.showMessage({
            type: 'error',
            title: `Failed to dispatch transaction, try again`,
          });
        }
      } finally {
        walletsStore.setIsPerformingTransaction(false);
      }
    },
  },
});
