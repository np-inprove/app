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

const user = useUserStore()
const headers = useRequestHeaders(['cookie'])

useAsyncData(async () => {
  // Preload user data for SSR
  await user.init(headers.cookie)
})
</script>

<template>
  <div h-full flex="~ col">
    <nav>
      <div mx-auto container>
        <div flex items-center justify-between px5 py8>
          <NuxtLink to="/">
            <img h-8 src="~/assets/logos/small.webp" alt="iNProve">
          </NuxtLink>

          <Popover md:hidden>
            <ColorModeButton />

            <PopoverButton ml-3 btn-outlined title="Open navigation menu" type="button">
              <div i-tabler-menu-2 text-xl />
            </PopoverButton>

            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <PopoverPanel v-slot="{ close }" fixed inset-x-0 top-0 z-10 origin-top-right transform p-3 transition>
                <div gap-2 rounded-lg bg-surface px-2 py-3 shadow-lg ring ring-1 ring-opacity-5>
                  <div mb-3 flex="~ gap-3" justify-between>
                    <NuxtLink to="/" @click="close">
                      <img m-3 h-8 src="~/assets/logos/small.webp" alt="iNProve">
                    </NuxtLink>

                    <div>
                      <PopoverButton btn-outlined>
                        <div i-tabler-x text-xl />
                      </PopoverButton>
                    </div>
                  </div>

                  <div flex="~ col">
                    <NuxtLink v-for="item in items" :key="item.to" :to="item.to" text-lg btn-text @click="close">
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

            <ColorModeButton />
          </div>
        </div>
      </div>
    </nav>
    <main flex-1>
      <div mx-auto h-full px5 container>
        <slot />
      </div>
    </main>
  </div>
</template>
