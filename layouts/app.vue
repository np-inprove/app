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
] satisfies Item[]

const auth = useAuthStore()
const theme = useTheme()

const headers = useRequestHeaders(['cookie'])
useAsyncData(async () => {
  await auth.init(headers.cookie)
  return Promise.resolve(true)
})
</script>

<template>
  <div h-full>
    <Head>
      <Link rel="stylesheet" :href="theme.link" />
    </Head>

    <header>
      <div mx-auto container>
        <div flex items-center justify-between px5 py8>
          <NuxtLink :to="`/@${auth.institution?.shortName}/dashboard`">
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
                      <!-- <ProfileButton /> -->
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

            <!-- <ProfileButton /> -->
            <CommonColorModeButton />
          </div>
        </div>
      </div>
    </header>
    <main mx-auto container>
      <div px5>
        <slot />
      </div>
    </main>
  </div>
</template>
