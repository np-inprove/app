<script setup lang="ts">
const props = defineProps({
  label: String,
  type: String,
  name: String,
  required: Boolean,
  modelValue: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-72">
    <div class="relative h-12 min-w-[200px] w-full">
      <input
        peer
        class="h-full w-full border border-outline border-t-transparent rounded-[7px] bg-transparent px-3 py-2.5 font-sans text-base font-normal outline-0 outline transition-all focus:border-2 placeholder-shown:border focus:border-primary placeholder-shown:border-outline placeholder-shown:border-outline focus:border-t-transparent disabled:bg-primary-container/12 focus:outline-0"
        :type="props.type"
        :name="props.name"
        :value="modelValue"
        placeholder=" "
        :required="props.required"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <label
        class="peer-placeholder-shown:text-border-outline peer-disabled:peer-placeholder-shown:text-border-outline pointer-events-none absolute left-0 h-full w-full flex select-none text-[11px] font-normal leading-tight transition-all after:pointer-events-none before:pointer-events-none -top-1.5 after:ml-1 after:mt-[6.5px] before:mr-1 before:mt-[6.5px] after:box-border before:box-border after:block before:block after:h-1.5 after:w-2.5 before:h-1.5 before:w-2.5 after:flex-grow after:border-r after:border-t before:border-l before:border-t after:border-outline before:border-outline after:rounded-tr-md before:rounded-tl-md peer-focus:text-[11px] peer-placeholder-shown:text-base peer-focus:leading-tight peer-placeholder-shown:leading-[3.75] peer-disabled:text-transparent peer-focus:text-primary after:transition-all before:transition-all after:content-space before:content-space peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-disabled:after:border-transparent peer-disabled:before:border-transparent peer-focus:after:border-primary peer-focus:before:border-primary peer-placeholder-shown:after:border-transparent peer-placeholder-shown:before:border-transparent"
      >
        {{ props.label }}
      </label>
    </div>
  </div>
</template>
