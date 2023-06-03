<script setup lang="ts">
definePageMeta({
  layout: 'landing',
  middleware: 'god-mode',
})

const institutions = useInstitutionStore()
const headers = useRequestHeaders(['cookie'])

useAsyncData(async () => {
  await institutions.init(headers.cookie)
  return true
})
</script>

<template>
  <div>
    iNProve project admin page
  </div>
</template>
