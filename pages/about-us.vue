<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const mode = 'light'

const authors = [
  {
    name: 'Ngui Jia Le Sherlena',
    title: 'Student at Ngee Ann Polytechnic',
    image: '/images/authors/sherlena.webp',
  },
  {
    name: 'Qin Guan',
    title: 'Student at Ngee Ann Polytechnic',
    image: '/images/authors/qin-guan.webp',
  },
  {
    name: 'Tan Yun-E',
    title: 'Student at Ngee Ann Polytechnic',
    image: '/images/authors/yun-e.webp',
  },
]
</script>

<template>
  <div pb-5 md:pb-10>
    <div flex justify-center p-5 text-3xl font-bold>
      Purpose of iNProve
    </div>
    <div flex flex-col p-5>
      <p text-justify>
        iNProve is a platform build by students for students. The aims of the platform is to make classes more engaging and effective for students. While students are rewarded with incentives, lecturers are able to better gauge the understanding of students by being able to track their students progress.
      </p>
      <p pt-5 text-justify>
        With the rise of asynchronous learning, students face new challenges in their learning experience. Compared to traditional lessons, asynchronous learning may seem uninteresting to students, causing trouble with focus, frustration, or even boredom. For educators, this is no doubt a frustrating issue. Scenarios where educators are uncertain whether students have completed their lesson content are becoming more common. As a result, it is increasingly important for educators to find ways to make asynchronous learning more fun and engaging for students.
      </p>
      <p pt-5 text-justify>
        Gamification is a potential solution to boost the effectiveness of self directed learning. iNProve aims to be a holistic, gamified platform, purpose built to help improve students’ engagement, motivation as well as knowledge retention. With proper incentives, students will be more likely to find solutions to problems that they may face, and assist other students.
      </p>
      <p pt-5 text-justify>
        Gamification can also serve as a tool for lecturers to improve their rapport with students. With a better rapport and more motivated students, educators will be able to better gauge students’ progress throughout the term.
      </p>
      <p pt-5 text-justify>
        iNProve is a platform that is designed to help students learn more effectively, using a variety of gamified elements. iNProve also provides opportunities for students to collaborate with each other and to receive feedback from their instructors.
        Gamification has the potential to revolutionize the way that students learn. By making learning more fun and engaging, gamification can help to improve student outcomes and to create a more positive learning environment for all.
      </p>
    </div>
    <div flex justify-center p-5 text-3xl font-bold>
      Design Rationale
    </div>
    <div flex flex-col p-5 md:flex-row>
      <div basis-full>
        <div h-full flex items-center justify-center py-2>
          <img src="../assets/logos/small.webp" alt="iNProve Logo">
        </div>
      </div>
      <div basis-full md:pl-10>
        <p text-justify>
          The rocket in the i represents the user embarking on the journey of self-directed learning. The colour <span bg-logo-i px-1 text-white dark:text-black>RED</span> is used to emphasise the part that the user has to play.
        </p>
        <p pt-5 text-justify>
          The NP represents the school which this learning platform was created under. While the use of the colour <span bg-logo-np px-1 text-white dark:text-black>{{ mode === 'light' ? 'BLACK' : 'WHITE' }}</span> represents that there is still some formality.
        </p>
        <p pt-5 text-justify>
          The letters r and v are playing with the letter o which is designed as a ball to emphasise the gamification of the platform and the colours used are brighter colours like <span bg-logo-rv px-1 text-black>YELLOW</span> and <span bg-logo-oe px-1 text-black>CYAN</span> to show a more fun platform.
        </p>
      </div>
    </div>
    <div flex justify-center p-5 text-3xl font-bold>
      Developers of iNProve
    </div>
    <div flex flex-col p-5 md:flex-row>
      <Card v-for="author in authors" :key="author.name" :name="author.name" :title="author.title" :picture="author.image" />
    </div>
  </div>
</template>
