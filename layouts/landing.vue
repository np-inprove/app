<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

interface Item {
  primary: boolean
  name: string
  to: string
}

const items = [
  {
    primary: false,
    name: 'About Us',
    to: '/about-us',
  },
  {
    primary: false,
    name: 'FAQs',
    to: '/faqs',
  },
  {
    primary: true,
    name: 'Login',
    to: '/login',
  },
] satisfies Item[]
</script>

<template>
  <div h-full>
    <nav>
      <div mx-auto container>
        <div flex items-center justify-between px5 py8>
          <NuxtLink to="/">
            <img h-8 src="~/assets/logos/small.webp" alt="iNProve">
          </NuxtLink>

          <Popover md:hidden>
            <PopoverButton btn-outlined>
              <div i-tabler-menu-2 text-xl />
            </PopoverButton>

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel fixed inset-x-0 top-0 z-10 origin-top-right transform p-3 transition>
                <div rounded-lg bg-surface p-4 shadow-lg ring ring-1 ring-opacity-5>
                  <div flex justify-end>
                    <PopoverButton btn-icon>
                      <div i-tabler-x text-xl />
                    </PopoverButton>
                  </div>

                  <div flex="~ col gap-3" items-start>
                    <NuxtLink
                      v-for="item in items" :key="item.to" :to="item.to"
                      :class="item.primary ? 'btn-filled' : 'btn-text'"
                    >
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          <div hidden gap-5 md:flex md:items-center>
            <NuxtLink
              v-for="item in items" :key="item.to" :to="item.to"
              :class="item.primary ? 'btn-filled' : 'btn-text'"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <main mx-auto container>
      <div px5>
        <slot />
      </div>
    </main>
  </div>
</template>
