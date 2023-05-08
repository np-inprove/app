<template>
  <div h-full>
    <header>
      <div mx-auto container>
        <div px5 py3>
          <img h-8 src="~/assets/logos/small.webp" alt="iNProve">
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
