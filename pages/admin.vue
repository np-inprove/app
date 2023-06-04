<script setup lang="ts">
import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const institution = useInstitutionStore()
const headers = useRequestHeaders(['cookie'])
useAsyncData(async () => {
  await institution.init(headers.cookie)
  return true
})

const initFormData = {
  name: '',
  shortName: '',
  adminDomain: '',
  studentDomain: '',
  isLoading: false,
  error: {},
}

const mode = ref<'create' | 'edit'>('create')
const formData = ref<{
  name: string
  shortName: string
  adminDomain: string
  studentDomain: string
  isLoading: boolean
  error: ValidationError
}>(initFormData)

function toggleEdit(institution: Institution) {
  mode.value = 'edit'
  formData.value = { ...formData.value, ...institution }
}

function toggleCreate() {
  mode.value = 'create'
  formData.value = initFormData
}

async function submit() {
  if (mode.value === 'create')
    return await create()
  else
    return alert('implement me')
}

async function create() {
  const err = await institution.create(formData.value.name, formData.value.shortName, formData.value.adminDomain, formData.value.studentDomain)
  if (err)
    formData.value.error = err
}

async function del() {
  const err = await institution.del(formData.value.shortName)
  if (err)
    formData.value.error = err
}
</script>

<template>
  <div>
    <div flex flex-col gap-5 lg:flex-row>
      <div flex-1>
        <div mb-5 flex justify-between>
          <h2 text-2xl font-semibold>
            Institutions
          </h2>

          <button btn-filled @click="toggleCreate">
            Create
          </button>
        </div>

        <div flex="~ gap-2 col">
          <div
            v-for="inst in institution.institutions" :key="inst.name"
            rounded-lg px-4 py-3
            :class="[inst.shortName === formData.shortName ? 'card' : 'card-low']"
            @click="toggleEdit(inst)"
          >
            <span>
              {{ inst.name }}
            </span>
          </div>
        </div>
      </div>

      <div flex-grow-2>
        <h3 text-lg font-semibold>
          <span v-if="mode === 'create'">
            Create Institution
          </span>
          <span v-else>
            Edit Institution
          </span>
        </h3>

        <div mt-5>
          <form @submit.prevent="submit">
            <div flex flex-col gap-5>
              <CommonInput v-model="formData.name" label="Institution Name" type="text" />
              <CommonInput v-model="formData.shortName" label="Institution Short Name" type="text" />
              <CommonInput v-model="formData.adminDomain" label="Admin Domain Name" type="text" />
              <CommonInput v-model="formData.studentDomain" label="Student Domain Name" type="text" />

              <div flex gap-3>
                <button btn-filled type="submit">
                  Save changes
                </button>

                <button v-if="mode === 'edit'" text-error btn-text type="button" @click="del">
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
