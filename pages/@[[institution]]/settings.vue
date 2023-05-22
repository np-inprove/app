<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.server }} settings page
  </div>
</template>
