<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { useToast } from 'primevue/usetoast'
import type { ValidationError } from '~/utils/error'

const props = defineProps<{
  institution: Institution
}>()

const toast = useToast()
const institution = useInstitutionStore()

const formData = ref<{
  name: string
  shortName: string
  description: string
  isLoading: boolean
  error: ValidationError
}>({
  ...props.institution,
  isLoading: false,
  error: {},
})

async function del() {
  const err = await institution.del(formData.value.shortName)
  if (err) {
    formData.value.error = err
  }
  else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Institution deleted',
    })
    navigateTo('/admin')
  }
}

async function update() {
  const err = await institution.update(
    props.institution.shortName,
    formData.value.name, formData.value.shortName, formData.value.description,
  )
  if (err) {
    formData.value.error = err
  }
  else {
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Institution modified',
    })
    navigateTo(`/admin/${formData.value.shortName}`)
  }
}
</script>

<template>
  <form mt-3 @submit.prevent="update()">
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
          <Textarea id="description" v-model="formData.description" type="text" required class="w-full" />
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
</template>
