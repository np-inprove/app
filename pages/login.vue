<script setup lang="ts">
import type { ValidationError } from '~/utils/error'

definePageMeta({
  layout: 'landing',
  middleware: 'anon',
})

const formData = reactive<{
  email: string
  password: string
  error: ValidationError
  isLoading: boolean
}>({
  email: '',
  password: '',
  error: {},
  isLoading: false,
})

const auth = useAuthStore()

async function login() {
  formData.isLoading = true
  const err = await auth.login(formData.email, formData.password)
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
        Login to iNProve
      </h1>

      <br>

      <form flex="~ col gap-5" @submit.prevent="login">
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
          :error="formData.error?.fields?.password"

          label="Password"
          type="password"
          name="Password"
          required
        />

        <button type="submit" :disabled="formData.isLoading" self-center btn-filled>
          Login
        </button>
      </form>
    </div>
  </div>
</template>
