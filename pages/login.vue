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
    <Card class="mb-40 min-w-[350px] rounded-xl p-6 md:(min-w-[400px] p-10)">
      <template #header>
        <h1 text-center text-2xl font-semibold>
          Login to iNProve
        </h1>
      </template>
      <template #content>
        <form flex="~ col gap-2" @submit.prevent="login">
          <div>
            <span class="p-float-label">
              <InputText id="email" v-model="formData.email" type="email" required class="w-full" />
              <label for="email">Email</label>
            </span>
            <small class="p-error">{{ formData.error?.fields?.email || '&nbsp;' }}</small>
          </div>

          <div>
            <span class="p-float-label">
              <InputText id="password" v-model="formData.password" type="password" required class="w-full" />
              <label for="password">Password</label>
            </span>
            <small class="p-error">{{ formData.error?.fields?.password || '&nbsp;' }}</small>
          </div>

          <Button label="Login" type="submit" :loading="formData.isLoading" w-full />
        </form>
        <p flex justify-center pt-4>
          <NuxtLink to="/register">
            <Button link aria-label="Register for an account">
              Don't have an account? Register here
            </Button>
          </NuxtLink>
        </p>
      </template>
    </Card>
  </div>
</template>
