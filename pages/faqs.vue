<script setup lang="ts">
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

definePageMeta({
  layout: 'landing',
})

interface Faq {
  title: string
  content: string
  linking: string
}

const faqs = [
  {
    title: 'How do I reset my account password?',
    content: 'Currently, we do not support the option of password self reset, do contact the administrator at the following email: helpdesk.inprove@gmail.com to request for a password reset.',
    linking: '/faq-pages/reset-password',
  },
  {
    title: 'How do I turn off notifications?',
    content: 'To Be Implemented',
    linking: '/faq-pages/off-notifications',
  },
  {
    title: 'How do I upload a file to the forum?',
    content: 'To Be Implemented',
    linking: '/faq-pages/uploading-file',
  },
  {
    title: 'How do I create an event for a group?',
    content: 'To Be Implemented',
    linking: '/faq-pages/event-creation',
  },
  {
    title: 'How do I redeem reward vouchers?',
    content: 'To Be Implemented',
    linking: '/faq-pages/prize-redemption',
  },
  {
    title: 'Am I able to change my pet?',
    content: 'To Be Implemented',
    linking: '/faq-pages/pets-customisation',
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
        <p>
          {{ faq.content }}
        </p>
        <NuxtLink :to="faq.linking">
          <Button link aria-label="View more information">
            View more information here
          </Button>
        </NuxtLink>
      </AccordionTab>
    </Accordion>
  </div>
</template>
