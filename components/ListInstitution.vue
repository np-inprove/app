<script setup lang="ts">
const props = defineProps({
  name: String,
})
</script>

<template>
  <div flex-1 rounded-md bg-surface-container p-3>
    <div>
      <p>
        {{ props.name }}
      </p>
    </div>
  </div>
</template>
