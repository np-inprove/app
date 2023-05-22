<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

const route = useRoute()
</script>

<template>
  <div>
    Institutions {{ route.params.server }} page
  </div>
</template>
