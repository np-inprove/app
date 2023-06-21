<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

definePageMeta({
  layout: 'landing',
})

interface Faq {
  title: string
  content: string
}

const faqs = [
  {
    title: 'How do I reset my account password?',
    content: '/faq-pages/reset-password',
  },
  {
    title: 'How do I turn off notifications?',
    content: '/faq-pages/off-notifications',
  },
  {
    title: 'How do I upload a file to the forum?',
    content: '/faq-pages/uploading-file',
  },
  {
    title: 'How do I create an event for a group?',
    content: '/faq-pages/event-creation',
  },
  {
    title: 'How do I redeem reward vouchers?',
    content: '/faq-pages/prize-redemption',
  },
  {
    title: 'Am I able to change my pet?',
    content: '/faq-pages/pets-customisation',
  },
] satisfies Faq[]
</script>

<template>
  <div w-full items-center>
    <h1 p-5 text-center text-3xl>
      Frequently Asked Questions
    </h1>
    <Accordion :active-index="0">
      <AccordionTab v-for="faq in faqs" :key="faq.title" :header="faq.title">
        <p>{{ faq.content }}</p>
      </AccordionTab>
    </Accordion>
  </div>
</template>
