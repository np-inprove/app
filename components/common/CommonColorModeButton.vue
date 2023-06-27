<script setup lang="ts">
import Button from 'primevue/button'

const theme = useThemeStore()
</script>

<template>
  <Button icon="true" rounded aria-label="Toggle theme" @click="theme.toggle">
    <div v-if="theme.mode === 'dark'" i-tabler-sun />
    <div v-else i-tabler-moon />
  </Button>
</template>
