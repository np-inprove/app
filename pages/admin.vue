<script setup lang="ts">
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import Toast from 'primevue/toast'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const router = useRouter()
const institution = useInstitutionStore()
const headers = useRequestHeaders(['cookie'])
useAsyncData(async () => {
  await institution.init(headers.cookie)
  return true
})

const institutionsMenu = computed(() => {
  const i: MenuItem[] = institution.institutions.map(inst => ({
    label: `${inst.name} (${inst.shortName})`,
    to: `/admin/${inst.shortName}`,
  }))
  i.push({ separator: true })
  return i
})

function toCreate() {
  router.push('/admin')
}
</script>

<template>
  <div>
    <Toast />

    <div flex flex-col gap-8 lg:flex-row>
      <div>
        <h2 text-2xl font-semibold>
          Institutions
        </h2>

        <Menu :model="institutionsMenu">
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
