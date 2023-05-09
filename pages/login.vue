<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const forminfo = reactive({
  email: '',
  password: '',
})

const errormessage = ref()

function login() {
  // errormessage.value = 'hi'
  // console.log(forminfo)
  forminfo.email = ''
  forminfo.password = ''
}
</script>

<template>
  <div flex justify-center text-center>
    <div class="w-full md:w-3/5" h-fit rounded-3xl bg-primary-container p-10>
      <h1 pb-5 text-15>
        Login
      </h1>
      <form flex flex-col @submit.prevent="login">
        <div flex justify-center>
          <input
            id="email" v-model="forminfo.email" type="email" name="email" placeholder="Email"
            required m-3 mx-0 w-full rounded-3xl p-5 md:mx-5
          >
        </div>
        <div flex justify-center>
          <input
            id="password" v-model="forminfo.password" type="password" name="password" placeholder="Password"
            required m-3 mx-0 w-full rounded-3xl p-5 md:mx-5
          >
        </div>
        <div flex justify-center>
          <button type="submit" m-5 w-fit btn-filled>
            Login
          </button>
        </div>
      </form>
      <div>
        <p font-bold text-error>
          {{ errormessage }}
        </p>
      </div>
    </div>
  </div>
</template>
