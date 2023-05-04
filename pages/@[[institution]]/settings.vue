<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.server }} settings page
  </div>
</template>
