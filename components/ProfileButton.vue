<script setup lang="ts">
const profile = ({
  primary: true,
  name: 'TAN YUN-E',
  picture: '/images/authors/yun-e.webp',
  to: '/login',
})
</script>

<template>
  <NuxtLink text-lg title="View Profile" type="button" to="/login">
    <Button link>
      <div flex>
        {{ profile.name }}
        <div pl-3>
          <img max-h-7 rounded-full :alt="profile.name" :src="profile.picture">
        </div>
      </div>
    </Button>
  </NuxtLink>
</template>
