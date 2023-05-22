<script setup lang="ts">
const themeMapping: Record<string, string> = {
  light: 'dark',
  dark: 'light',
}
</script>

<template>
  <button text-lg btn-outlined title="Toggle color mode" type="button" @click="$colorMode.preference = themeMapping[$colorMode.value]">
    <ClientOnly>
      <template #fallback>
        <div i-tabler-mood-tongue />
      </template>
      <div v-if="$colorMode.preference === 'dark'" i-tabler-sun />
      <div v-else i-tabler-moon />
    </ClientOnly>
  </button>
</template>
