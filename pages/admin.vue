<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const institutions = useInstitutionStore()
const headers = useRequestHeaders(['cookie'])
useAsyncData(async () => {
  await institutions.init(headers.cookie)
  return true
})

const editFormData = ref(null)

const formData = reactive({
  name: '',
  shortName: '',
  adminDomain: '',
  studentDomain: '',
})

let message = ''

function showMessage() {
  if (!editFormData.value)
    message = 'Create Institution'

  else
    message = 'Edit Institution'

  return message
}

function editInstitution(Institution) {
  editFormData.value = Institution
}

function createInstitution() {
  editFormData.value = null
}

async function addInstutition() {
  const inst = await god.create(formData.name, formData.shortName, formData.adminDomain, formData.studentDomain)
}

async function deleteInstitution() {
  const del = await god.del(editFormData.value.shortName)
}
</script>

<template>
  <div>
    <div grid="~ cols-1 md:cols-3 gap-2">
      <div self-start grid="~ gap-2">
        <div>
          <h2 inline-block>
            Institutions
          </h2>
          <button btn-filled @click="createInstitution">
            Create
          </button>
        </div>

        <div
          v-for="inst in god.institutions" :key="inst.name" flex-1 rounded-md bg-surface-container p-3
          @click="editInstitution(inst)"
        >
          {{ inst.name }}
        </div>
      </div>

      <div grid="col-span-2">
        <h2>{{ showMessage() }}</h2>
        <button @click="editFormData = null" />
        <div v-if="!editFormData">
          <form @submit.prevent="addInstutition">
            <CommonInput v-model="formData.name" label="Institution Name" type="text" />
            <CommonInput v-model="formData.shortName" label="Institution Short Name" type="text" />
            <CommonInput v-model="formData.adminDomain" label="Admin Domain Name" type="text" />
            <CommonInput v-model="formData.studentDomain" label="Student Domain Name" type="text" />
            <input btn-filled type="submit" value="Add Institution">
          </form>
        </div>
        <div v-else>
          <form @submit.prevent="addInstutition">
            <CommonInput v-model="editFormData.name" label="Institution Name" type="text" />
            <CommonInput v-model="editFormData.shortName" label="Institution Short Name" type="text" />
            <CommonInput v-model="editFormData.adminDomain" label="Admin Domain Name" type="text" />
            <CommonInput v-model="editFormData.studentDomain" label="Student Domain Name" type="text" />
            <input btn-filled type="submit" value="Update Institution">
            <button btn-filled @click="deleteInstitution">
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
