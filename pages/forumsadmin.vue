<script setup lang="ts">
import Button from 'primevue/button'
import Menu from 'primevue/menu'

import Toast from 'primevue/toast'
import { ref } from 'vue'

definePageMeta({
  layout: 'app',
})

const router = useRouter()

const forum_groups = [
  {
    name: 'NS CSF01',
    shortName: 'NSSF_01',
    description: 'NS group for CSF01',
  },
  {
    name: 'NS CSF02',
    shortName: 'NSSF_01',
    description: 'NS group for CSF02',
  },
]

const items = ref([
  {
    label: 'NS CSF01',
    to: `/forumsadmin/${forum_groups[1].shortName}`,
  },
  {
    label: 'NS CSF02',
    to: `/forumsadmin/${forum_groups[1].shortName}`,
  },
])

function toCreate() {
  router.push('/forumsadmin')
}
</script>

<template>
  <Toast />

  <div flex flex-col gap-8 lg:flex-row>
    <div>
      <h2 text-2xl font-semibold>
        Group Forums
      </h2>

      <Menu :model="items">
        <template #end>
          <Button text w-full @click="toCreate">
            New
          </Button>
        </template>
      </Menu>
    </div>

    <div flex-1>
      <NuxtPage />
    </div>
  </div>
</template>

<style scoped>
:deep(a.router-link-active) {
    background-color: var(--highlight-bg);
    color: var(--highlight-text-color);
    --at-apply: font-bold;
}

:deep(a.router-link-active:hover) {
    background-color: var(--highlight-bg);
    color: var(--highlight-text-color);
}

:deep(a.router-link-active>.menu-icon i) {
    color: var(--highlight-text-color);
}
</style>
