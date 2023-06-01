<script setup lang="ts">
import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'landing',
  middleware: 'god-mode',
})

const god = useGodStore()
const headers = useRequestHeaders(['cookie'])

useAsyncData(async () => {
  await god.init(headers.cookie)
  return true
})

const formData = reactive<{
  academicSchoolName: string
  shortAcademicSchoolName: string
  error: ValidationError
  isLoading: boolean
}>({
  academicSchoolName: '',
  shortAcademicSchoolName: '',
  error: {},
  isLoading: false,
})

async function registerSchool() {
  formData.isLoading = true
  formData.isLoading = false
}
</script>

<template>
  <div h-full flex items-center justify-center>
    <div class="mb-40 min-w-[350px] rounded-xl bg-surface-container-low p-6 md:(min-w-[400px] p-10)">
      <h1 text-center text-2xl font-semibold>
        Add a New Academic School
      </h1>
      <br>
      <form flex="~ col gap-5" @submit.prevent="registerSchool">
        <CommonInput
          v-model="formData.academicSchoolName"
          :error="formData.error?.fields?.academicSchoolName"

          label="Academic School Name"
          type="text"
          name="academicSchoolName"
          required
        />

        <CommonInput
          v-model="formData.shortAcademicSchoolName"
          :error="formData.error?.fields?.shortAcademicSchoolName"

          label="Course Abbreviations"
          type="text"
          name="shortAcademicSchoolName"
          required
        />

        <button type="submit" :disabled="formData.isLoading" self-center btn-filled>
          Add School
        </button>
      </form>
    </div>
  </div>
</template>
