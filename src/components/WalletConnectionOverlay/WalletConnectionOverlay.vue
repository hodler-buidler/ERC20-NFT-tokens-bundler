<template>
  <div class="container" :style="styleVariables">
    <div v-if="isOverlayVisible" class="overlay">
      <a-result :status="overlayAlertIcon" :title="overlayTitle">
        <template #subTitle>
          <div v-if="isNoWalletsSupportedAlertVisible">
            Please check out:
            <span v-for="(wallet, index) in installableWallets" :key="`wallet-name__${index}`">
              <span v-if="index !== 0">,&nbsp;</span>
              <a :href="wallet.installLink" target="_blank">{{ wallet.name }}</a>
            </span>
          </div>

          <div v-if="isNoSupportedChainAlertVisible">
            Please use:
            <span v-for="(chain, index) in SUPPORTED_CHAINS" :key="`chain-name__${index}`">
              <span v-if="index !== 0">,</span>
              {{ chain.name }}
            </span>
          </div>
        </template>

        <template #extra>
          <div v-if="isWalletNotConnectedAlertVisible">
            <a-button type="primary" :loading="isWalletConnecting" @click="connectWallet">
              Connect wallet
            </a-button>
          </div>
        </template>
      </a-result>
    </div>

    <div class="content">
      {{ connectedAddress }}
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { StylingVariablesMap } from '@/types/common';
  import { useWalletsStore } from '@/state';
  import { SUPPORTED_CHAINS } from '@/config/wallets';
  import { getInstallableWallets } from '@/utils/wallets';

  export default defineComponent({
    name: 'WalletConnectionOverlay',
    props: {
      borderRadius: { type: String, default: '0px' },
    },
    setup(props) {
      const walletsStore = useWalletsStore();
      const {
        isAnyWalletSupported,
        isSupportedChainEnabled,
        isWalletConnected,
        isWalletConnecting,
      } = storeToRefs(walletsStore);
      const installableWallets = getInstallableWallets();

      const isOverlayVisible = computed(() => {
        return (
          !isAnyWalletSupported.value || !isSupportedChainEnabled.value || !isWalletConnected.value
        );
      });

      const isNoWalletsSupportedAlertVisible = computed(() => !isAnyWalletSupported.value);
      const isNoSupportedChainAlertVisible = computed(
        () => !isNoWalletsSupportedAlertVisible.value && !isSupportedChainEnabled.value,
      );
      const isWalletNotConnectedAlertVisible = computed(
        () =>
          !isNoWalletsSupportedAlertVisible.value &&
          !isNoSupportedChainAlertVisible.value &&
          !isWalletConnected.value,
      );

      const overlayAlertIcon = computed(() => {
        if (isNoWalletsSupportedAlertVisible.value || isNoSupportedChainAlertVisible.value)
          return 'warning';
        return 'info';
      });

      const overlayTitle = computed(() => {
        if (isNoWalletsSupportedAlertVisible.value) return 'No supported wallets installed';
        if (isNoSupportedChainAlertVisible.value) return 'Currently enabled chain is not supported';
        if (isWalletNotConnectedAlertVisible.value) return 'Please, connect your wallet';
        return '';
      });

      const styleVariables = computed((): StylingVariablesMap => {
        return {
          '--border-radius': props.borderRadius,
        };
      });

      return {
        installableWallets,
        SUPPORTED_CHAINS,
        isNoWalletsSupportedAlertVisible,
        isNoSupportedChainAlertVisible,
        isWalletNotConnectedAlertVisible,
        isWalletConnecting,
        isOverlayVisible,
        overlayAlertIcon,
        overlayTitle,
        styleVariables,
        connectWallet: walletsStore.connectWallet,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
  }

  .content {
    position: relative;
    z-index: 10;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 15;
    border-radius: var(--border-radius);
    background: rgba(230, 230, 230, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
