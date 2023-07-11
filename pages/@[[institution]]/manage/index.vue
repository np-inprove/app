<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const group = useGroupStore()
const headers = useRequestHeaders(['cookie'])
useAsyncData(async () => {
  await group.init(headers.cookie)
  return true
})

interface AdminPages {
  text: string
  link: string
}

const adminPages = [
  {
    text: 'Manage Group',
    link: 'manage/groups/new',
  },
  {
    text: 'View available Pet Accessories and Vouchers',
    link: 'manage/rewards',
  },
  {
    text: 'Modify Pet Accessories and Vouchers',
    link: 'manage/add-rewards',
  },
] satisfies AdminPages[]
</script>

<template>
  <div>
    <h1 p-5 text-center text-3xl>
      iNProve Administrative Page
    </h1>
    <div grid="~ gap-5 cols-1 md:cols-2" justify-center>
      <div v-for="adminPage in adminPages" :key="adminPage.text" class="card">
        <Card>
          <template #title>
            {{ adminPage.text }}
          </template>
          <template #content>
            <p>
              {{ adminPage.text }}
            </p>
          </template>
          <template #footer>
            <NuxtLink :to="adminPage.link">
              <Button>
                <div class="i-material-symbols-arrow-outward-rounded" me-2 h-5 w-5 />
                <div>
                  Configure Now!
                </div>
              </Button>
            </NuxtLink>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
