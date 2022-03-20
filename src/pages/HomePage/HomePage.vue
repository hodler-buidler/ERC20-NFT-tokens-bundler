<template>
  <div class="page">
    <div class="heading-1 align-center">Tokens Bundler</div>

    <div class="page__bundler">
      <TokensBundler />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TokensBundler from '@/components/TokensBundler/TokensBundler.vue';

  export default defineComponent({
    name: 'HomePage',
    components: { TokensBundler },
    setup() {
      return {};
    },
  });
</script>

<style lang="scss" scoped>
  .page {
    &__bundler {
      margin-top: 32px;
    }
  }
</style>
