<script setup lang="ts">
const props = defineProps({
  label: String,
  error: String,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const inputClasses = [
  // Basic styles
  'h-full w-full border border-2 border-on-surface-variant border-t-transparent text-sm rounded-lg bg-transparent px-3 py-2.5',
  // Disabled input field
  'disabled:(opacity-12)',
  // Focused input field
  'focus:(border border-2 border-primary border-t-transparent outline-0)',
  // Placeholder shown input field
  'placeholder-shown:(border border-2 border-primary)',
]

const labelClasses = [
  // Basic stylews
  'pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none transition-all',
  // Text styles
  'text-sm leading-tight text-on-surface-variant',
  // Before
  'before:(content-space pointer-events-none mt-[6.5px] mr-1 box-border block h-1.5 w-2.5 rounded-tl-md border-t border-l border-outline transition-all)',
  // After
  'after:(content-space pointer-events-none mt-[6.5px] ml-1 box-border block h-1.5 w-2.5 flex-grow rounded-tr-md border-t border-outline transition-all)',
  // Input placeholder shown
  'peer-placeholder-shown:(text-sm leading-[3.75] text-on-surface-variant before:border-transparent after:border-transparent)',
  // Input focused
  'peer-focus:(text-sm leading-tight text-primary before:(border-t-2 border-l-2 border-primary) after:(border-t-2 border-r-2 border-primary))',
  // Input disabled
  'peer-disabled:(before:border-transparent after:border-transparent opacity-12)',
]
</script>

<template>
  <div relative>
    <input
      v-bind="$attrs"
      :title="props.label"

      peer
      placeholder=" "
      :class="inputClasses"

      :value="props.modelValue"
      @input="onInput"
    >

    <label :class="labelClasses">
      {{ props.label }}
    </label>

    <Transition
      enter-active-class="transition duration-150 ease-out" leave-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0 transform translate-x-1" leave-to-class="opacity-0 transform h-0"
    >
      <p v-if="props.error" mt-2 text-sm leading-tight text-error>
        {{ props.error }}
      </p>
    </Transition>
  </div>
</template>
