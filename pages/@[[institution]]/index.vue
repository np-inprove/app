<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const route = useRoute()
</script>

<template>
  <div>
    Institutions {{ route.params.server }} page
  </div>
</template>
