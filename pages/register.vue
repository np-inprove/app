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
    <Card class="mb-40 min-w-[350px] rounded-xl p-6 md:(min-w-[400px] p-10)">
      <template #header>
        <h1 text-center text-2xl font-semibold>
          Register for iNProve
        </h1>
      </template>
      <template #content>
        <form flex="~ col gap-5" @submit.prevent="register">
          <div>
            <span class="p-float-label">
              <InputText id="firstName" v-model="formData.firstName" type="text" required w-full />
              <label for="firstName">First name</label>
            </span>
            <small class="p-error">{{ formData.error?.fields?.firstname || '&nbsp;' }}</small>
          </div>

          <div>
            <span class="p-float-label">
              <InputText id="lastName" v-model="formData.lastName" type="text" required class="w-full" />
              <label for="lastName">Last name</label>
            </span>
            <small class="p-error">{{ formData.error?.fields?.lastName || '&nbsp;' }}</small>
          </div>

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

          <div>
            <span class="p-float-label">
              <InputText id="confirmPassword" v-model="formData.confirmPassword" type="password" required
                class="w-full" />
              <label for="confirmPassword">Confirm password</label>
            </span>
            <small class="p-error">{{ formData.error?.fields?.confirmPassword || '&nbsp;' }}</small>
          </div>

          <Button type="submit" :disabled="formData.isLoading" self-center>
            Register
          </Button>
        </form>
        <p flex justify-center pt-4>
          <NuxtLink to="/login">
            <Button link aria-label="Login now">
              Already have an account? Login now
            </Button>
          </NuxtLink>
        </p>
      </template>
    </Card>
  </div>
</template>
