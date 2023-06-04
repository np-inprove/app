<script setup lang="ts">
definePageMeta({
  layout: 'landing',
  middleware: 'anon',
})

interface Card {
  icon: string
  title: string
  description: string
}

const cards = [
  {
    icon: 'i-fluent-emoji-memo',
    title: 'Plan your learning',
    description: 'Share and create your study plan',
  },
  {
    icon: 'i-fluent-emoji-pancakes',
    title: 'Participation pancakes',
    description: 'Praise your peers for helping!',
  },
  {
    icon: 'i-fluent-emoji-calendar',
    title: 'Events',
    description: 'Participate in events related to your modules',
  },
  {
    icon: 'i-material-symbols-forum-outline-rounded',
    title: 'Forum',
    description: 'Chat, learn and share your notes with your peers',
  },
  {
    icon: 'i-fluent-emoji-paw-prints',
    title: 'Pets',
    description: 'Take care of pets or redeem prizes as you study and help your peers',
  },
] satisfies Card[]
</script>

<template>
  <div flex flex-col gap-10 pb-30>
    <div grid="~ cols-1 md:cols-2 gap-6 md:gap-10" class="min-h-[500px]">
      <div flex flex-1 flex-col justify-center md:flex-grow-2>
        <span class="leading-[4]">
          <h1 text-4xl font-black lg:text-5xl>
            A gamified learning platform
          </h1>
          <span text-xl font-semibold lg:text-3xl>
            for students, by students
          </span>
        </span>
      </div>

      <div flex items-center justify-center>
        <CommonAppLogo class="w-3/4" />
      </div>
    </div>

    <section flex flex-col items-center>
      <h2 text-3xl font-bold lg:text-3xl>
        Features of iNProve
      </h2>

      <br>
      <br>

      <div grid="~ gap-6 cols-1 md:cols-2" justify-center>
        <div v-for="card in cards" :key="card.title">
          <Card rounded-xl>
            <template #content>
              <div flex flex-col gap-3 px-4 md:flex-row>
                <div :class="card.icon" h-30 w-30 />

                <div w-full flex flex-col md:w-60>
                  <h3 my-0 text-xl font-bold>
                    {{ card.title }}
                  </h3>
                  <p mt-2 text-lg>
                    {{ card.description }}
                  </p>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>
