<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const router = useRouter()
const toast = useToast()
const group = useGroupStore()

const groupData = computed(() => group.groups.find(grp => grp.shortName === router.currentRoute.value.params.shortName))

const initFormData = computed(() => {
  if (!groupData.value) {
    return {
      ogShortName: '',
      name: '',
      shortName: '',
      description: '',
      isLoading: false,
      error: {},
    }
  }
  return {
    ogShortName: groupData.value.shortName,
    ...groupData.value,
    isLoading: false,
    error: {},
  }
})

const formData = ref<{
  ogShortName: string
  name: string
  shortName: string
  description: string
  isLoading: boolean
  error: ValidationError
}>(initFormData.value)

async function update() {
  const err = await group.update(formData.value.ogShortName, formData.value.name, formData.value.shortName, formData.value.description)
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
          Edit {{ initFormData.name }}
        </span>
      </h3>

      <div mt-5>
        <form @submit.prevent="update">
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
      </div>
    </div>
  </div>
</template>
