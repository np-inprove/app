<script setup lang="ts">
const props = defineProps({
  name: String,
  title: String,
  picture: String,
})
</script>

<template>
  <div flex-1 border-2 border-outline-variant rounded-md p-5>
    <div flex items-center justify-center md:mt-0>
      <img max-h-52 rounded-full :alt="props.name" :src="props.picture">
    </div>

    <div text-center>
      <h1 p-2 text-lg font-bold>
        {{ props.name }}
      </h1>

      <p>
        {{ props.title }}
      </p>
    </div>
  </div>
</template>
