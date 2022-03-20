<template>
  <WalletConnectionOverlay border-radius="2px">
    <div class="wrapper">
      <a-radio-group v-model:value="currentBundleMode" class="modes noselect" button-style="solid">
        <a-radio-button :value="BundleMode.Approve" class="modes__item">
          {{ filters.capitalizeFirst(BundleModeService.getName(BundleMode.Approve)) }}
        </a-radio-button>
        <a-radio-button :value="BundleMode.Wrap" class="modes__item">
          {{ filters.capitalizeFirst(BundleModeService.getName(BundleMode.Wrap)) }}
        </a-radio-button>
        <a-radio-button :value="BundleMode.Unwrap" class="modes__item">
          {{ filters.capitalizeFirst(BundleModeService.getName(BundleMode.Unwrap)) }}
        </a-radio-button>
      </a-radio-group>

      <div class="body">
        <perfect-scrollbar class="content">
          <component
            :is="currentBundleModeView"
            @enabled="isActionDisabled = false"
            @disabled="isActionDisabled = true"
          />
        </perfect-scrollbar>

        <footer class="footer">
          <a-button
            class="action-btn"
            type="primary"
            size="large"
            :disabled="isActionDisabled"
            :loading="isAssetsLoading || isPerformingTransaction"
            @click="onAction"
          >
            {{ filters.capitalizeFirst(currentBundleModeName) }}
          </a-button>
        </footer>
      </div>
    </div>
  </WalletConnectionOverlay>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { BundleMode } from '@/types/app';
  import { BundleModeService } from '@/logic/bundle-mode';
  import { useUserStore, useWalletsStore } from '@/state';
  import * as filters from '@/utils/filters';
  import WalletConnectionOverlay from '@/components/WalletConnectionOverlay/WalletConnectionOverlay.vue';
  import { TokensBundlerEventBus, TokensBundlerEvents } from './logic/TokensBundlerEventBus';
  import WrapTokens from './components/WrapTokens/WrapTokens.vue';
  import UnwrapTokens from './components/UnwrapTokens/UnwrapTokens.vue';
  import ApproveTokens from './components/ApproveTokens/ApproveTokens.vue';

  export default defineComponent({
    name: 'TokensBundler',
    components: { WrapTokens, UnwrapTokens, WalletConnectionOverlay, ApproveTokens },
    setup() {
      const userStore = useUserStore();
      const walletsStore = useWalletsStore();
      const { isAssetsLoading } = storeToRefs(userStore);
      const { isPerformingTransaction } = storeToRefs(walletsStore);

      const currentBundleMode = ref(BundleMode.Approve);
      const currentBundleModeName = computed(() =>
        BundleModeService.getName(currentBundleMode.value),
      );
      const currentBundleModeView = computed(() => {
        const viewsMap: Record<BundleMode, any> = {
          [BundleMode.Wrap]: WrapTokens,
          [BundleMode.Unwrap]: UnwrapTokens,
          [BundleMode.Approve]: ApproveTokens,
        };
        return viewsMap[currentBundleMode.value];
      });

      const isActionDisabled = ref(false);
      function onAction(): void {
        TokensBundlerEventBus.trigger(TokensBundlerEvents.ACTION_REQUESTED, null);
      }

      return {
        filters,
        isAssetsLoading,
        isPerformingTransaction,
        BundleMode,
        BundleModeService,
        currentBundleMode,
        currentBundleModeName,
        currentBundleModeView,
        isActionDisabled,
        onAction,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 900px;
    border: 1px solid var(--base-border-color);
    border-radius: 2px;
    border-top: none;
    box-sizing: border-box;
  }

  .modes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;

    &__item {
      border-left: none;
      border-right: none;
    }
  }

  .body {
    padding: 16px;
  }

  .content {
    height: 150px;
  }

  .footer {
    text-align: center;
    padding-top: 16px;
  }

  .action-btn {
    min-width: 200px;
  }
</style>
