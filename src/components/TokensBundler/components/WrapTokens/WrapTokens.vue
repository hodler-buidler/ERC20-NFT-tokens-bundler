<template>
  <div class="wrap-tokens">
    <div class="tokens-select">
      <a-skeleton :loading="isAssetsLoading" active :paragraph="false">
        <a-select
          v-model:value="selectedAssetsIds"
          :options="assetsOptions"
          placeholder="Select tokens"
          class="full-width"
          size="large"
          mode="multiple"
        />
      </a-skeleton>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue';
  import { useUserStore, useTokensBundlerStore } from '@/state';
  import { storeToRefs } from 'pinia';
  import { Asset } from '@/api/open-sea';
  import { convertAssetToMultiTokenAsset } from '@/utils/tokens';
  import { useFreshAssets } from '../../composables';
  import { TokensBundlerEventBus, TokensBundlerEvents } from '../../logic/TokensBundlerEventBus';

  export default defineComponent({
    name: 'WrapTokens',
    emits: ['disabled', 'enabled'],
    setup(props, { emit }) {
      useFreshAssets({}, { approvedOnly: true });

      const userStore = useUserStore();
      const tokensBundlerStore = useTokensBundlerStore();
      const { ownedAssets, isAssetsLoading } = storeToRefs(userStore);

      const assetsOptions = computed(() => {
        return ownedAssets.value.map((asset) => ({
          value: asset.id,
          label: asset.asset_contract.name,
        }));
      });
      const selectedAssetsIds = ref<number[]>([]);
      const selectedAssets = computed(() => {
        const result = selectedAssetsIds.value
          .map((assetId) => ownedAssets.value.find((asset) => asset.id == assetId))
          .filter((asset) => !!asset);
        return result as Asset[];
      });

      const isActionDisabled = computed(() => {
        return !selectedAssetsIds.value.length;
      });

      watch(isActionDisabled, (isDisabled) => (isDisabled ? emit('disabled') : emit('enabled')), {
        immediate: true,
      });

      onMounted(() => {
        TokensBundlerEventBus.subscribe(TokensBundlerEvents.ACTION_REQUESTED, handleWrapTokens);
      });

      onUnmounted(() => {
        TokensBundlerEventBus.unsubscribe(TokensBundlerEvents.ACTION_REQUESTED, handleWrapTokens);
      });

      function handleWrapTokens(): void {
        const multiTokenAssets = selectedAssets.value.map((asset) =>
          convertAssetToMultiTokenAsset(asset, '1'),
        );
        tokensBundlerStore.wrapAssets(multiTokenAssets);
      }

      return {
        selectedAssetsIds,
        isAssetsLoading,
        assetsOptions,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .wrap-tokens {
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
