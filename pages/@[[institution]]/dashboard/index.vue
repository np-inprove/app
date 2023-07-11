<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb'

definePageMeta({
  layout: 'app',
  middleware: 'auth',
})

interface MenuContent {
  options: string
  icon: string
}

const menu = [
  {
    options: 'Groups',
    icon: 'i-fluent-emoji-graduation-cap',
  },
  {
    options: 'Rewards',
    icon: 'i-fluent-emoji-money-bag',
  },
  {
    options: 'Visit Pet',
    icon: 'i-fluent-emoji-paw-prints',
  },
  {
    options: 'Calander',
    icon: 'i-fluent-emoji-calendar',
  },
] satisfies MenuContent[]
</script>

<template>
  <div class="card justify-content-center flex flex-row">
    <Breadcrumb :model="menu">
      <template #item="{ item }">
        <a>
          <div flex>
            <div :class="item.icon" />
            {{ item.options }}
          </div>
        </a>
      </template>
    </Breadcrumb>
  </div>
</template>
