<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

interface Faq {
  text: string
  link: string
}

const faqs = [
  {
    text: 'How do I reset my account password?',
    link: '/login',
  },
  {
    text: 'How do I turn off notifications?',
    link: '',
  },
  {
    text: 'How do I upload a file to the forum?',
    link: '',
  },
  {
    text: 'How do I create an event for a group?',
    link: '',
  },
  {
    text: 'How do I redeem reward vouchers?',
    link: '',
  },
  {
    text: 'How do I reset my account password?',
    link: '',
  },
] satisfies Faq[]
</script>

<template>
  <div flex flex-col items-center>
    <h1 p-5 text-center text-3xl>
      Frequently Asked Questions
    </h1>
    <div>
      Search Bar Here
    </div>
    <div class="w-full md:w-3/5" grid grid-cols-1 mt-5 gap-3 overflow-hidden border-2 border-outline rounded-3xl pb-3 text-left divide-y-2 divide-outline>
      <FAQRedirect v-for="faq in faqs" v-bind="faq" :key="faq.text" />
    </div>
  </div>
</template>
