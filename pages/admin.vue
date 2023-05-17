<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const institutions = [
  {
    name: 'Ngee Ann Polytechnic',
  },
  {
    name: 'Gardens by the Bay',
  },
  {
    name: 'Cloud Forest',
  },
]
</script>

<template>
  <div>
    iNProve project admin page
    <div grid="~ cols-1 md:cols-3 gap-2">
      <div grid="~ gap-2">
        <ListInstitution v-for="author in institutions" v-bind="author" :key="author.name" />
      </div>
      <div grid="col-span-2">
        <div h-32 flex rounded-md bg-tertiary>
          <p align-middle text-white>
            Statistics
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
