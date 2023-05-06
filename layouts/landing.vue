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
      <div container mx-auto>
        <div px5 py8 flex items-center justify-between>
          <NuxtLink to="/">
            <img h-8 src="~/assets/logos/small.webp" alt="iNProve">
          </NuxtLink>

          <Popover md:hidden>
            <PopoverButton btn-icon>
              <div text-xl i-tabler-menu-2 />
            </PopoverButton>

            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="translate-y-1 opacity-0"
            >
              <PopoverPanel fixed z-10 top-0 inset-x-0 p-3 transition transform origin-top-right>
                <div p-4 rounded-lg shadow-lg ring-1 ring-opacity-5 bg-base ring>
                  <div flex justify-end>
                    <PopoverButton btn-icon>
                      <div text-xl i-tabler-x />
                    </PopoverButton>
                  </div>

                  <div flex="~ col gap-3" items-start>
                    <NuxtLink
                      v-for="item in items" :key="item.to" :to="item.to"
                      :class="item.primary ? 'btn-primary' : 'btn-link'"
                    >
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>

          <div md:flex md:items-center gap-10 hidden>
            <NuxtLink
              v-for="item in items" :key="item.to" :to="item.to"
              :class="item.primary ? 'btn-primary' : 'btn-link'"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>
    <main container mx-auto>
      <div px5>
        <slot />
      </div>
    </main>
  </div>
</template>
