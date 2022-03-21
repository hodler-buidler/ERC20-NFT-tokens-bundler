import { defineStore, storeToRefs } from 'pinia';
import { OpenseaAPI, Asset, FetchAssetsParams } from '@/api/open-sea';
import { Web3Provider } from '@/types/app';
import { isApprovedForAll } from '@/api/smart-contracts/ERC1155';
import { getTokensBundlerContractAddress } from '@/api/smart-contracts/tokens-bundler';
import { getCurrentChainId } from '@/utils/wallets';
import { DEFAULT_CHAIN } from '@/config/wallets';
import { useAppStore } from '../app';
import { useWalletsStore } from '../wallets';
import { LoadAssetsConfig } from './types';

export interface UserState {
  assets: Asset[];
  isAssetsLoading: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    assets: [],
    isAssetsLoading: true,
  }),
  actions: {
    setAssets(assets: Asset[]) {
      this.assets = assets;
    },

    setIsAssetsLoading(isAssetsLoading: boolean) {
      this.isAssetsLoading = isAssetsLoading;
    },

    async loadAssets(
      params?: FetchAssetsParams,
      { approvedOnly = false, notApprovedOnly = false }: LoadAssetsConfig = {},
    ) {
      const appStore = useAppStore();
      const { walletProvider, connectedAddress } = storeToRefs(useWalletsStore());

      try {
        this.setIsAssetsLoading(true);
        this.setAssets([]);
        let { assets } = await OpenseaAPI.fetchAssets(params, {
          chainId: getCurrentChainId() || DEFAULT_CHAIN.id,
        });

        if ((approvedOnly || notApprovedOnly) && walletProvider.value) {
          const approvalStatusesPromises = assets.map((asset) => {
            return isApprovedForAll({
              provider: walletProvider.value as Web3Provider,
              assetAddress: asset.asset_contract.address,
              holderAddress: connectedAddress.value,
              spenderAddress: getTokensBundlerContractAddress(
                getCurrentChainId() || DEFAULT_CHAIN.id,
              ),
            });
          });

          const approvalsStatuses = await Promise.all(approvalStatusesPromises);
          assets = assets.filter((asset, assetIdx) => {
            if (approvedOnly) return !!approvalsStatuses[assetIdx];
            return !approvalsStatuses[assetIdx];
          });
        }

        this.assets = assets;
      } catch (err) {
        appStore.showMessage({
          type: 'error',
          title: 'Failed to fetch assets, try reloading the page',
        });
      } finally {
        this.setIsAssetsLoading(false);
      }
    },
  },
});
