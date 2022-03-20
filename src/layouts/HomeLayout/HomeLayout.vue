<template>
  <div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'HomeLayout',
    setup() {
      return {};
    },
  });
</script>

<style lang="scss" scoped>
  .content {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
  }
</style>
