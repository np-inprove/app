<script setup lang="ts">
const props = defineProps({
  text: String,
  link: String,
})
</script>

<template>
  <NuxtLink px-3 pt-3 :to="props.link">
    {{ props.text }}
  </NuxtLink>
</template>
