<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Toolbar from 'primevue/toolbar'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'

import type { ValidationError } from 'utils/error'

const props = defineProps<{
  shortName: string
  invites: InstitutionInviteLink[]
}>()

const institution = useInstitutionStore()

const roleTagMapping: Record<InstitutionRoles, string> = {
  admin: 'danger',
  educator: 'warning',
  member: 'primary',
}

const formData = reactive<{
  dialog: boolean
  role?: InstitutionRoles
  error?: ValidationError
  pending: boolean
  pendingDel?: string
}>({
  dialog: false,
  error: {},
  pending: false,
})

const options = ref([
  { name: 'Admin', code: 'admin' },
  { name: 'Educator', code: 'educator' },
  { name: 'Member', code: 'member' },
])

async function create() {
  if (!formData.role)
    return

  formData.pending = true
  const err = await institution.createInvite(props.shortName, formData.role)
  if (err)
    formData.error = err

  formData.pending = false
  formData.dialog = false
}

function copyLink(code: string) {
  navigator.clipboard.writeText(`${window.location.origin}/s/${code}`)
}

async function del(code: string) {
  formData.pendingDel = code

  const err = await institution.delInvite(props.shortName, code)
  if (err)
    formData.error = err

  delete formData.pendingDel
}
</script>

<template>
  <div>
    <Dialog v-model:visible="formData.dialog" :modal="true" header="New invite">
      <Dropdown
        v-model="formData.role"
        option-value="code"
        editable
        :options="options" option-label="name" placeholder="Select a role" class="w-full"
      />

      <template #footer>
        <Button text type="button" :loading="formData.pending" @click="create">
          Create
        </Button>
      </template>
    </Dialog>

    <Toolbar class="mb-4">
      <template #end>
        <Button label="New" severity="success" class="mr-2" @click="formData.dialog = true" />
      </template>
    </Toolbar>

    <div v-if="props.invites.length === 0">
      <div flex justify-center>
        <span>No invites available!</span>
      </div>
    </div>

    <DataTable v-else :value="invites">
      <Column field="id" header="ID" />
      <Column field="role" header="Role">
        <template #body="{ data }">
          <Tag :severity="roleTagMapping[data.role as InstitutionRoles]">
            {{ data.role }}
          </Tag>
        </template>
      </Column>
      <Column field="code" header="Code">
        <template #body="{ data }">
          <span font-mono>{{ data.code }}</span>
        </template>
      </Column>
      <Column field="code" header="Actions">
        <template #body="{ data }">
          <div flex gap-3>
            <Button v-tooltip.bottom="'Copy link'" icon="true" text @click="copyLink(data.code)">
              <div i-tabler-copy />
            </Button>
            <Button icon="true" severity="danger" text :loading="formData.pendingDel === data.code" @click="del(data.code)">
              <div i-tabler-trash />
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
