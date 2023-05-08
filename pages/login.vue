<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const forminfo = reactive({
  email: '',
  password: '',
})

function login() {
  console.log(forminfo)
  forminfo.email = ''
  forminfo.password = ''
}

const errormessage = 'hi'
</script>

<template>
  <div class="centralise" flex justify-center>
    <div class="rcorners" bg-primary-container rounded-3xl>
      <h1 text-15 pb-5>Login</h1>
      <form flex flex-col>
        <input id="email" v-model="forminfo.email" type="text" name="email" placeholder="Email" rounded-3xl class="formfield" required>
        <input id="password" v-model="forminfo.password" type="password" name="password" placeholder="Password" rounded-3xl class="formfield" required>
        <div flex justify-center>
          <button type="submit" btn-filled w-fit m-5 @click.prevent="login">
            Login
          </button>
        </div>
      </form>
      <div>
        <p>
          {{ errormessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
p {
  color: red;
  font-weight: bold;
}

.centralise {
  text-align: center;
  margin: 25px;
}

.rcorners {
  padding: 20px;
  width: 60%;
}

.formfield {
  margin: 10px;
  padding: 10px;
  text-align: center;
}
</style>
