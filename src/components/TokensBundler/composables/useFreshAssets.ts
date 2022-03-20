import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { FetchAssetsParams } from '@/api/open-sea';
import { useUserStore, useWalletsStore } from '@/state';
import { LoadAssetsConfig } from '@/state/user/types';

export function useFreshAssets(params: FetchAssetsParams = {}, config: LoadAssetsConfig = {}) {
  const userStore = useUserStore();
  const walletsStore = useWalletsStore();
  const { connectedAddress } = storeToRefs(walletsStore);

  watch(
    connectedAddress,
    (address: string) => {
      if (address) {
        userStore.loadAssets(
          {
            owner: address,
            ...params,
          },
          config,
        );
      }
    },
    { immediate: true },
  );
}
