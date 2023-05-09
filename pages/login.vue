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
    <div bg-primary-container rounded-3xl p-10 class="w-full md:w-3/5" h-fit>
      <h1 text-15 pb-5>Login</h1>
      <form flex flex-col @submit.prevent="login">
        <div flex justify-center>
          <input id="email" v-model="forminfo.email" type="email" name="email" placeholder="Email" rounded-3xl p-5 m-3
            mx-0 md:mx-5 w-full required>
        </div>
        <div flex justify-center>
          <input id="password" v-model="forminfo.password" type="password" name="password" placeholder="Password"
            rounded-3xl p-5 m-3 mx-0 md:mx-5 w-full required>
        </div>
        <div flex justify-center>
          <button type="submit" btn-filled w-fit m-5>
            Login
          </button>
        </div>
      </form>
      <div>
        <p text-error font-bold>
          {{ errormessage }}
        </p>
      </div>
    </div>
  </div>
</template>
