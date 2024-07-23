<template>
  <div class="w-full flex flex-col lg:flex-row">
    <div class="w-full lg:w-1/4 flex flex-col lg:py-2 px-4">
      <slot name="sidebar"></slot>
    </div>

    <hr class="my-2 block lg:hidden" />

    <div class="w-full lg:w-3/4 flex flex-col lg:py-2 px-4">
      <slot></slot>
    </div>
  </div>
</template>
