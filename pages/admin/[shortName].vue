<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const router = useRouter()
const toast = useToast()
const institution = useInstitutionStore()

const initFormData = computed(() => {
  const res = institution.institutions.find(inst => inst.shortName === router.currentRoute.value.params.shortName)
  if (!res) {
    return {
      name: '',
      shortName: '',
      description: '',
      isLoading: false,
      error: {},
    }
  }
  return {
    ...res,
    isLoading: false,
    error: {},
  }
})

const formData = ref<{
  name: string
  shortName: string
  description: string
  isLoading: boolean
  error: ValidationError
}>(initFormData.value)

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
  const err = await institution.update(formData.value.name, formData.value.shortName, formData.value.description, router.currentRoute.value.params.shortName)
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
  <div>
    <div v-if="!initFormData.shortName">
      <h3 text-xl font-semibold>
        Institution not found
      </h3>
    </div>

    <div v-else>
      <h3 text-lg font-semibold>
        <span>
          Edit {{ initFormData.name }}
        </span>
      </h3>

      <div mt-5>
        <form @submit.prevent="update()">
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
