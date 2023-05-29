<script setup lang="ts">
definePageMeta({
  layout: 'landing',
  middleware: 'anon',
})

interface Colour {
  title: string
  logo: string
}

const colourmode = [
  {
    title: 'iNProve Logo',
    logo: '../_nuxt/assets/logos/small.svg',
  },
  {
    title: 'iNProve Logo',
    logo: '../_nuxt/assets/logos/small-dark.svg',
  },
] satisfies Colour[]

const modecolour = useColorMode()
const int = 0

if (modecolour.value === 'dark') {
  const int = 1
}
else {
  const int = 0
}
</script>

<template>
  <div pb-5 md:pb-10>
    <div h-full flex items-center justify-center p-5 py-2>
      <img :src="colourmode[int].logo" alt="iNProve Logo" class="w-full md:w-4/5">
    </div>
    <h1 h-full flex items-center justify-center p-5 py-2 font-black lg:text-3xl md:text-xl>
      A Gamified Platform by the Students for the Students
    </h1>
    <div flex justify-center p-5>
      <div i-tabler-arrow-big-down-lines m-0 h-30 w-30 py-2 md:m-9 />
    </div>
    <div flex flex-col>
      <div grid grid-cols-2 gap-6>
        <h1 col-span-2 col-start-1 flex justify-center font-black lg:text-3xl md:text-xl>
          Features of iNProve
        </h1>
        <div flex flex-col justify-center md:flex-row>
          <div i-fluent-emoji-memo h-30 w-30 py-2 pr-5 />
          <div w-full flex flex-col md:w-60>
            <p px-2 font-bold>
              Plan Your Learning
            </p>
            <p px-2>
              Share And Create Your Study Plan
            </p>
          </div>
        </div>
        <div flex flex-col justify-center md:flex-row>
          <div i-fluent-emoji-pancakes h-30 w-30 py-2 pr-5 />
          <div w-full flex flex-col md:w-60>
            <p px-2 font-bold>
              Participation Pancakes
            </p>
            <p px-2>
              Be Awarded By Your Peers As You Contribute By Sharing
            </p>
          </div>
        </div>
        <div flex flex-col justify-center md:flex-row>
          <div i-fluent-emoji-calendar h-30 w-30 py-2 pr-5 />
          <div w-full flex flex-col md:w-60>
            <p px-2 font-bold>
              Events
            </p>
            <p px-2>
              Participate In Events Related To Your Modules
            </p>
          </div>
        </div>
        <div flex flex-col justify-center md:flex-row>
          <div i-material-symbols-forum-outline-rounded h-30 w-30 py-2 pr-5 />
          <div w-full flex flex-col md:w-60>
            <p px-2 font-bold>
              Forum
            </p>
            <p px-2>
              Chat, Learn And Share Your Notes With Your Peers
            </p>
          </div>
        </div>
        <div flex flex-col justify-center md:flex-row>
          <div i-fluent-emoji-paw-prints h-30 w-30 py-2 pr-5 />
          <div w-full flex flex-col md:w-60>
            <p px-2 font-bold>
              Pets
            </p>
            <p px-2>
              Take Care Of Pets Or Redeem Prizes As You Study And Help Your Peers
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
