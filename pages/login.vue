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
  // TODO: Connect to backend
  errormessage.value = 'hi'
  // console.log(forminfo)
  forminfo.email = ''
  forminfo.password = ''
}
</script>

<template>
  <div flex justify-center text-center>
    <!-- TODO: Waiting for colours to finalise -->
    <!-- <div class="w-full md:w-3/5" h-fit rounded-3xl bg-surface-container-lowest p-10> -->
    <div class="w-full md:w-3/5" h-fit rounded-3xl bg-primary-container p-10>
      <h1 pb-5 text-15>
        Login
      </h1>
      <form flex flex-col @submit.prevent="login">
        <div flex justify-center>
          <Input v-model="forminfo.email" label="Email" type="email" name="email" :required="true" m-3 mx-0 w-full md:mx-6 />
        </div>
        <div flex justify-center>
          <Input v-model="forminfo.password" label="Password" type="password" name="password" :required="true" m-3 mx-0 w-full md:mx-6 />
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
