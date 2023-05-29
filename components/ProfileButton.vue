<script setup lang="ts">
const profile = ({
  primary: true,
  name: 'TAN YUN-E',
  picture: '/images/authors/yun-e.webp',
  to: '/login',
})
</script>

<template>
  <NuxtLink text-lg btn-text title="View Profile" type="button" to="/login">
    <div flex>
      {{ profile.name }}
      <div pl-3>
        <img max-h-7 rounded-full :alt="profile.name" :src="profile.picture">
      </div>
    </div>
  </NuxtLink>
</template>
