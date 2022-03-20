<template>
  <div class="unwrap-tokens">
    <div class="tokens-select">
      <a-skeleton :loading="isAssetsLoading" active :paragraph="false">
        <a-select
          v-model:value="selectedAssetId"
          :options="assetsOptions"
          placeholder="Select tokens"
          class="full-width"
          size="large"
        />
      </a-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue';
  import { useUserStore, useTokensBundlerStore } from '@/state';
  import { storeToRefs } from 'pinia';
  import { getTokensBundlerContractAddress } from '@/api/smart-contracts/tokens-bundler';
  import { DEFAULT_CHAIN } from '@/config/wallets';
  import { getCurrentChainId } from '@/utils/wallets';
  import { useFreshAssets } from '../../composables';
  import { TokensBundlerEventBus, TokensBundlerEvents } from '../../logic/TokensBundlerEventBus';

  export default defineComponent({
    name: 'UnwrapTokens',
    emits: ['disabled', 'enabled'],
    setup(props, { emit }) {
      useFreshAssets({
        asset_contract_address: getTokensBundlerContractAddress(
          getCurrentChainId() || DEFAULT_CHAIN.id,
        ),
      });

      const userStore = useUserStore();
      const tokensBundlerStore = useTokensBundlerStore();
      const { assets, isAssetsLoading } = storeToRefs(userStore);

      const assetsOptions = computed(() => {
        return assets.value.map((asset) => ({
          value: asset.id,
          label: asset.asset_contract.name,
        }));
      });
      const selectedAssetId = ref(null);
      const selectedAsset = computed(() => {
        return assets.value.find((asset) => asset.id === selectedAssetId.value);
      });

      const isActionDisabled = computed(() => {
        return !selectedAssetId.value;
      });

      watch(isActionDisabled, (isDisabled) => (isDisabled ? emit('disabled') : emit('enabled')), {
        immediate: true,
      });

      onMounted(() => {
        TokensBundlerEventBus.subscribe(TokensBundlerEvents.ACTION_REQUESTED, handleUnwrapTokens);
      });

      onUnmounted(() => {
        TokensBundlerEventBus.unsubscribe(TokensBundlerEvents.ACTION_REQUESTED, handleUnwrapTokens);
      });

      function handleUnwrapTokens(): void {
        if (!selectedAsset.value) return;
        tokensBundlerStore.unwrapTokens(selectedAsset.value.token_id);
      }

      return {
        isAssetsLoading,
        assetsOptions,
        selectedAssetId,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .unwrap-tokens {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tokens-select {
    width: 80%;
    min-width: 250px;
  }
</style>
