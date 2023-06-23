<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const toast = useToast()

const institution = useInstitutionStore()
const headers = useRequestHeaders(['cookie'])
useAsyncData(async () => {
  await institution.init(headers.cookie)
  return true
})

const initFormData = {
  name: '',
  shortName: '',
  description: '',
  isLoading: false,
  error: {},
}

const formData = ref<{
  name: string
  shortName: string
  description: string
  isLoading: boolean
  error: ValidationError
}>(initFormData)

async function create() {
  const err = await institution.create(formData.value.name, formData.value.shortName, formData.value.description)
  if (err) {
    formData.value.error = err
  }
  else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Institution created',
    })
    navigateTo(`/admin/${formData.value.shortName}`)
  }
}
</script>

<template>
  <div>
    <h3 text-lg font-semibold>
      <span>
        Create institution
      </span>
    </h3>

    <div mt-5>
      <form @submit.prevent="create">
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
              Create
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
