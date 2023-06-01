<script setup lang="ts">
definePageMeta({
  layout: 'landing',
  middleware: 'god-mode',
})

const god = useGodStore()
const headers = useRequestHeaders(['cookie'])

useAsyncData(async () => {
  await god.init(headers.cookie)
  return true
})

interface Card {
  academicSchool: string
  academicCourse: string
}

const cards = [
  {
    academicSchool: 'Plan Your Learning',
    academicCourse: 'Share And Create Your Study Plan',
  },
  {
    academicSchool: 'Participation Pancakes',
    academicCourse: 'Praise your peers for helping!',
  },
  {
    academicSchool: 'Events',
    academicCourse: 'Participate In Events Related To Your Modules',
  },
  {
    academicSchool: 'Forum',
    academicCourse: 'Chat, Learn And Share Your Notes With Your Peers',
  },
  {
    academicSchool: 'Pets',
    academicCourse: 'Take Care Of Pets Or Redeem Prizes As You Study And Help Your Peers',
  },
] satisfies Card[]
</script>

<template>
  <div>
    <div flex flex-row py-5>
      <h1 text-center text-3xl>
        Edit Academic School
      </h1>
      <NuxtLink i-fluent-emoji-plus ml-5 self-center to="/dashboard/admin/add-school" />
    </div>
    <div grid="~ gap-6 cols-1 md:cols-2" justify-center>
      <div v-for="card in cards" :key="card.academicSchool">
        <div flex flex-col gap-3 card-low md:flex-row>
          <div w-full flex flex-col>
            <h3 text-xl font-bold>
              {{ card.academicSchool }}
            </h3>

            <p mt-2 text-lg>
              {{ card.academicCourse }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
