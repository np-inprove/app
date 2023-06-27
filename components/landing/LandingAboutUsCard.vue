<script setup lang="ts">
import Card from 'primevue/card'

const props = defineProps({
  name: String,
  title: String,
  picture: String,
})
</script>

<template>
  <Card flex-1 rounded-md p-5>
    <template #content>
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
    </template>
  </Card>
</template>
