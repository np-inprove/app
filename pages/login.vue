<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const formData = reactive({
  email: '',
  password: '',
  loading: false,
  error: {
    email: '',
    password: '',
  },
})

const user = useUserStore()

async function login() {
  formData.loading = true
  try {
    await user.login(formData.email, formData.password)
  }
  catch (e) {
    console.error(e)
  }
  formData.loading = false
}
</script>

<template>
  <div h-full flex items-center justify-center>
    <div class="mb-40 min-w-[350px] rounded-xl bg-surface-container-low p-6 md:(min-w-[400px] p-10)">
      <h1 text-center text-2xl font-semibold>
        Login to iNProve
      </h1>

      <!-- TODO: DEBUG REMOVE -->
      <span>{{ user.email }}</span>

      <br>

      <form flex="~ col gap-5" @submit.prevent="login">
        <AppInput
          v-model="formData.email"
          :error="formData.error.email"

          label="Email"
          type="email"
          name="Email"
          required
        />

        <AppInput
          v-model="formData.password"
          :error="formData.error.password"

          label="Password"
          type="password"
          name="Password"
          required
        />

        <button type="submit" :disabled="formData.loading" self-center btn-filled>
          Login
        </button>
      </form>
    </div>
  </div>
</template>
