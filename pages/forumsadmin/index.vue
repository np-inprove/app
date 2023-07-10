<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'app',
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
</script>

<template>
  <h3 text-lg font-semibold>
    <span>
      Create Forum
    </span>
  </h3>

  <div mt-5>
    <form @submit.prevent="">
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
</template>
