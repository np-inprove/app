<script setup lang="ts">
import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'landing',
  middleware: 'anon',
})

const formData = reactive<{
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  error: ValidationError
  isLoading: boolean
}>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: {},
  isLoading: false,
})

const noMatchErr = computed(() => (formData.password !== formData.confirmPassword ? 'Password does not match' : ''))

const auth = useAuthStore()

async function register() {
  if (noMatchErr.value)
    return
  formData.isLoading = true
  const err = await auth.register(formData.firstName, formData.lastName, formData.email, formData.password)
  if (!err)
    return navigateTo('/dashboard')
  formData.error = err
  formData.isLoading = false
}
</script>

<template>
  <div h-full flex items-center justify-center>
    <div class="mb-40 min-w-[350px] rounded-xl bg-surface-container-low p-6 md:(min-w-[400px] p-10)">
      <h1 text-center text-2xl font-semibold>
        Register for iNProve
      </h1>
      <br>
      <form flex="~ col gap-5" @submit.prevent="register">
        <CommonInput
          v-model="formData.firstName"
          :error="formData.error?.fields?.firstname"

          label="First Name"
          type="text"
          name="firstname"
          required
        />

        <CommonInput
          v-model="formData.lastName"
          :error="formData.error?.fields?.lastname"

          label="Last Name"
          type="text"
          name="lastname"
          required
        />

        <CommonInput
          v-model="formData.email"
          :error="formData.error?.fields?.email"

          label="Email"
          type="email"
          name="Email"
          required
        />

        <CommonInput
          v-model="formData.password"
          :error="noMatchErr || formData.error?.fields?.password "

          label="Password"
          type="password"
          name="Password"
          required
        />

        <CommonInput
          v-model="formData.confirmPassword"
          :error="noMatchErr || formData.error?.fields?.confirmPassword"

          label="Confirm Password"
          type="password"
          name="confirmpassword"
          required
        />

        <button type="submit" :disabled="formData.isLoading" self-center btn-filled>
          Register
        </button>
      </form>
      <p flex justify-center pt-4>
        <NuxtLink to="/login" btn-text>
          Already have an account? Login now
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
