<template>
  <div h-full>
    <header>
      <div container mx-auto>
        <div px5 py8 flex>
          <img h-8 src="~/assets/logos/small.webp" alt="iNProve">
          <div ml-auto>
            <NuxtLink to="/login" class="btn-ghost">
              Register
            </NuxtLink>
            <NuxtLink to="/login" class="btn-primary">
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
