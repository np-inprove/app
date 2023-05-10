<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const mode = 'light'
</script>

<template>
  <div flex justify-center p-5 text-3xl font-bold>
    Design Rationale
  </div>
  <div flex flex-col md:flex-row>
    <div basis-full>
      <div h-full flex items-center justify-center py-2>
        <img src="../assets/logos/small.webp" alt="iNProve Logo">
      </div>
    </div>
    <div basis-full md:pl-10>
      <p text-justify>
        The rocket in the i represents the user embarking on the journey of self-directed learning. The colour <span bg-logo-i px-1 text-logo-np-dark>RED</span> is used to emphasise the part that the user has to play.
      </p>
      <p pt-5 text-justify>
        The NP represents the school which this learning platform was created under. While the use of the colour <span :class="[`bg-logo-np-${mode}`, `text-logo-np-${mode === 'light' ? 'dark' : 'light'}`]" px-1>{{ mode === 'light' ? 'BLACK' : 'WHITE' }}</span> represents that there is still some formality.
      </p>
      <p pt-5 text-justify>
        The letters r and v are playing with the letter o which is designed as a ball to emphasise the gamification of the platform and the colours used are brighter colours like <span bg-logo-rv px-1>YELLOW</span> and <span bg-logo-oe px-1>CYAN</span> to show a more fun platform.
      </p>
    </div>
  </div>
</template>
