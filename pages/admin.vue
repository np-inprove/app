<script setup lang="ts">
definePageMeta({
  layout: 'landing',
  middleware: 'god-mode',
})

const god = useGodStore()
const headers = useRequestHeaders(['cookie'])

useAsyncData(async () => {
  await god.init(headers.cookie)
  return true
})
</script>

<template>
  <div>
    iNProve project admin page
  </div>
</template>
