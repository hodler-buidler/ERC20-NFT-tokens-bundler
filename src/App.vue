<template>
  <router-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useInitWallets, useAppMessages } from '@/state';

  export default defineComponent({
    name: 'App',
    setup() {
      useAppMessages();
      useInitWallets();
      return {};
    },
  });
</script>

<style scoped lang="scss"></style>
