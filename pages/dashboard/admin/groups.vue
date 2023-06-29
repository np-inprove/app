<script setup lang="ts">
import Menu from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import Toast from 'primevue/toast'
import Button from 'primevue/button'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const router = useRouter()
const group = useGroupStore()
const headers = useRequestHeaders(['cookie'])
useAsyncData(async () => {
  await group.init(headers.cookie)
  return true
})

const groupsMenu = computed(() => {
  const i: MenuItem[] = group.groups.map(grp => ({
    label: `${grp.name} (${grp.shortName})`,
    to: `/dashboard/admin/groups/${grp.shortName}`,
  }))
  i.push({ separator: true })
  return i
})

function toCreate() {
  router.push('/dashboard/admin/groups')
}
</script>

<template>
  <div>
    <Toast />

    <div flex flex-col gap-8 lg:flex-row>
      <div>
        <h2 text-2xl font-semibold>
          Groups
        </h2>

        <Menu :model="groupsMenu">
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
