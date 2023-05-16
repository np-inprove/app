<script setup lang="ts">
const props = defineProps({
  name: String,
  title: String,
  picture: String,
})
</script>

<template>
  <div mx-2 mb-5 basis-full border-2 border-primary-container rounded-md md:mb-0 md:p-5>
    <div mt-5 flex items-center justify-center md:mt-0>
      <img max-h-52 rounded-full :alt="props.name" :src="props.picture">
    </div>
    <div mb-5 text-center md:mb-0>
      <h1 p-2 text-lg font-bold>
        {{ props.name }}
      </h1>
      <p pb-2>
        {{ props.title }}
      </p>
    </div>
  </div>
</template>
