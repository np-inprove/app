<template>
  <div h-full>
    <header>
      <div container mx-auto>
        <div px5 py3 flex>
          <img h-8 src="~/assets/logos/small.webp" alt="iNProve">
          <div ml-auto>
            <NuxtLink to="/about">
              About Us
            </NuxtLink>
          </div>
          <div px5>
            <NuxtLink to="/faq">
              Support
            </NuxtLink>
          </div>
          <div>
            <NuxtLink to="/login">
              Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>
    <main container mx-auto>
      <div px5>
        <slot />
      </div>
    </main>
  </div>
</template>
