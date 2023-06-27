<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'
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

const auth = useAuthStore()
const theme = useThemeStore()
const headers = useRequestHeaders(['cookie'])

useAsyncData(async () => {
  // Preload user data for SSR
  await auth.init(headers.cookie)
  theme.init()
  return true // Prevent refetch
})
</script>

<template>
  <div h-full flex="~ col">
    <Head>
      <Link rel="stylesheet" :href="theme.link" />
      <Link rel="prefetch" as="style" :href="theme.preload" />
    </Head>

    <nav>
      <div mx-auto container>
        <div flex items-center justify-between px5 py8>
          <NuxtLink to="/">
            <CommonAppLogo h-8 />
          </NuxtLink>

          <Popover md:hidden>
            <div flex items-center>
              <CommonColorModeButton />
              <PopoverButton text :as="Button" icon="true" ml-3 aria-label="Open">
                <div i-tabler-menu-2 text-xl />
              </PopoverButton>
            </div>

            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <PopoverPanel v-slot="{ close }" fixed inset-x-0 top-0 z-10 origin-top-right transform p-3 transition>
                <Card>
                  <template #content>
                    <div mb-3 flex="~ gap-3" justify-between>
                      <NuxtLink to="/" @click="close">
                        <CommonAppLogo m-3 h-8 />
                      </NuxtLink>

                      <div>
                        <PopoverButton text :as="Button" icon="true">
                          <div i-tabler-x text-xl />
                        </PopoverButton>
                      </div>
                    </div>

                    <div flex="~ col">
                      <NuxtLink v-for="item in items" :key="item.to" :to="item.to" @click="close">
                        <Button link :label="item.name">
                          {{ item.name }}
                        </Button>
                      </NuxtLink>
                    </div>
                  </template>
                </Card>
              </PopoverPanel>
            </Transition>
          </Popover>

          <div hidden gap-5 md:flex md:items-center>
            <NuxtLink v-for="item in items" :key="item.to" :to="item.to">
              <Button :link="!item.primary" :label="item.name">
                {{ item.name }}
              </Button>
            </NuxtLink>

            <CommonColorModeButton />
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
