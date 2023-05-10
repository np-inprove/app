<template>
  <div class="relative h-10 max-w-[24rem] min-w-[200px] w-full flex">
    <input

      type="email"
      class="peer h-full w-full border border-blue-gray-200 border-t-transparent rounded-[7px] bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline-0 outline transition-all disabled:border-0 focus:border-2 placeholder-shown:border focus:border-pink-500 placeholder-shown:border-blue-gray-200 focus:border-t-transparent placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50 focus:outline-0"
      placeholder=" "
      required peer
    >
    <button
      class="right-1 top-1 z-10 select-none rounded bg-pink-500 px-4 py-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all peer-placeholder-shown:pointer-events-none !absolute peer-placeholder-shown:bg-blue-gray-500 active:opacity-[0.85] focus:opacity-[0.85] peer-placeholder-shown:opacity-50 active:shadow-none focus:shadow-none hover:shadow-lg hover:shadow-pink-500/40 peer-placeholder-shown:shadow-none"
      type="button"
      data-ripple-light="true"
    >
      Invite
    </button>
    <label class="pointer-events-none absolute left-0 h-full w-full flex select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all after:pointer-events-none before:pointer-events-none -top-1.5 after:ml-1 after:mt-[6.5px] before:mr-1 before:mt-[6.5px] after:box-border before:box-border after:block before:block after:h-1.5 after:w-2.5 before:h-1.5 before:w-2.5 after:flex-grow after:border-r after:border-t before:border-l before:border-t after:border-blue-gray-200 before:border-blue-gray-200 after:rounded-tr-md before:rounded-tl-md peer-focus:text-[11px] peer-placeholder-shown:text-sm peer-focus:leading-tight peer-placeholder-shown:leading-[3.75] peer-disabled:text-transparent peer-focus:text-pink-500 peer-placeholder-shown:text-blue-gray-500 after:transition-all before:transition-all after:content-space before:content-space peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-disabled:after:border-transparent peer-disabled:before:border-transparent peer-placeholder-shown:after:border-transparent peer-placeholder-shown:before:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 peer-focus:after:!border-pink-500 peer-focus:before:!border-pink-500">
      Email Address
    </label>
  </div>
</template>
