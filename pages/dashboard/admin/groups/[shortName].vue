<script setup lang="ts">
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Toolbar from 'primevue/toolbar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'
import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const group = useGroupStore()

onMounted(async () => {
  await group.loadInvites(route.params.shortName as string)
})

const invitesData = computed(() => {
  return group.invites[route.params.shortName as string] ?? []
})

const groupData = computed(() => group.groups.find(grp => grp.shortName === router.currentRoute.value.params.shortName))

const initFormData = computed(() => {
  if (!groupData.value) {
    return {
      ogName: '',
      ogShortName: '',
      name: '',
      shortName: '',
      description: '',
      isLoading: false,
      error: {},
    }
  }
  return {
    ogName: groupData.value.name,
    ogShortName: groupData.value.shortName,
    ...groupData.value,
    isLoading: false,
    error: {},
  }
})

const formData = ref<{
  ogName: string
  ogShortName: string
  name: string
  shortName: string
  description: string
  isLoading: boolean
  error: ValidationError
}>(initFormData.value)

async function update() {
  const err = await group.update(formData.value.ogName, formData.value.ogShortName, formData.value.name, formData.value.shortName, formData.value.description)
  if (err) {
    formData.value.error = err
  }
  else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Group updated',
    })
    navigateTo(`/dashboard/admin/groups/${formData.value.shortName}`)
  }
}

async function del() {
  const err = await group.del(formData.value.ogShortName)
  if (err) {
    formData.value.error = err
  }
  else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Group deleted',
    })
    navigateTo('/dashboard/admin/groups')
  }
}

// Invite Links

const roleTagMapping: Record<GroupRoles, string> = {
  owner: 'danger',
  educator: 'warning',
  member: 'primary',
}

const inviteFormData = reactive<{
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
  { name: 'Owner', code: 'owner' },
  { name: 'Educator', code: 'educator' },
  { name: 'Member', code: 'member' },
])

async function createlink() {
  if (groupData.value === undefined || !inviteFormData.role)
    return

  inviteFormData.pending = true
  const err = await group.createInvite(groupData.value.shortName, inviteFormData.role)
  if (err)
    inviteFormData.error = err

  inviteFormData.pending = false
  inviteFormData.dialog = false
}

function copyLink(code: string) {
  navigator.clipboard.writeText(`${window.location.origin}/s/${code}`)
}

async function delinvite(code: string) {
  inviteFormData.pendingDel = code

  if (groupData.value === undefined)
    return

  const err = await group.delInvite(groupData.value.shortName, code)
  if (err)
    inviteFormData.error = err

  delete inviteFormData.pendingDel
}
</script>

<template>
  <div>
    <div v-if="!initFormData.shortName">
      <h3 text-xl font-semibold>
        Group not found
      </h3>
    </div>

    <div v-else>
      <h3 text-lg font-semibold>
        <span>
          Edit {{ initFormData.ogName }} Group
        </span>
      </h3>
      <TabView>
        <TabPanel header="Info">
          <form mt-5 @submit.prevent="update">
            <div flex flex-col gap-2>
              <div>
                <span class="p-float-label">
                  <InputText id="name" v-model="formData.name" type="text" required class="w-full" />
                  <label for="name">Name</label>
                </span>
                <small class="p-error">{{ formData.error?.fields?.name || '&nbsp;' }}</small>
              </div>

              <div>
                <span class="p-float-label">
                  <InputText id="shortName" v-model="formData.shortName" type="text" required class="w-full" />
                  <label for="shortName">Short name</label>
                </span>
                <small class="p-error">{{ formData.error?.fields?.shortName || '&nbsp;' }}</small>
              </div>

              <div>
                <span class="p-float-label">
                  <InputText id="description" v-model="formData.description" type="text" required class="w-full" />
                  <label for="description">Description</label>
                </span>
                <small class="p-error">{{ formData.error?.fields?.description || '&nbsp;' }}</small>
              </div>

              <div flex gap-3>
                <Button type="submit">
                  Save changes
                </Button>

                <Button label="Delete" severity="danger" text @click="del">
                  Delete
                </Button>
              </div>
            </div>
          </form>
        </TabPanel>
        <TabPanel header="Invites">
          <Dialog v-model:visible="inviteFormData.dialog" :modal="true" header="New invite">
            <Dropdown
              v-model="inviteFormData.role"
              option-value="code"
              editable
              :options="options" option-label="name" placeholder="Select a role" class="w-full"
            />

            <template #footer>
              <Button text type="button" :loading="inviteFormData.pending" @click="createlink">
                Create
              </Button>
            </template>
          </Dialog>

          <Toolbar class="mb-4">
            <template #end>
              <Button label="New" severity="success" class="mr-2" @click="inviteFormData.dialog = true" />
            </template>
          </Toolbar>

          <div v-if="invitesData.length === 0">
            <div flex justify-center>
              <span>No invites available!</span>
            </div>
          </div>

          <DataTable v-else :value="invitesData">
            <Column field="id" header="ID" />
            <Column field="role" header="Role">
              <template #body="{ data }">
                <Tag :severity="roleTagMapping[data.role as GroupRoles]">
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
                  <Button icon="true" severity="danger" text :loading="inviteFormData.pendingDel === data.code" @click="delinvite(data.code)">
                    <div i-tabler-trash />
                  </Button>
                </div>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>
