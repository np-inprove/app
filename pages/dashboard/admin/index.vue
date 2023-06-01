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

interface AdminPages {
  text: string
  link: string
}

const adminPages = [
  {
    text: 'Edit Institution',
    link: '/dashboard/admin/',
  },
  {
    text: 'Edit Academic Schools',
    link: '/dashboard/admin/academic-schools',
  },
  {
    text: 'Edit Pet Accessories and Vouchers',
    link: '/dashboard/admin/',
  },
] satisfies AdminPages[]
</script>

<template>
  <div flex flex-col items-center>
    <h1 p-5 text-center text-3xl>
      iNProve Administrative Page
    </h1>
    <div class="w-full md:w-3/5" grid grid-cols-1 my-5 gap-3 overflow-hidden border-2 border-outline rounded-3xl pb-3 text-left divide-y-2 divide-outline>
      <NuxtLink v-for="adminPage in adminPages" :key="adminPage.text" px-3 pt-3 :to="adminPage.link">
        {{ adminPage.text }}
      </NuxtLink>
    </div>
  </div>
</template>
