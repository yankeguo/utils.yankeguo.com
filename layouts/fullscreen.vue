<template>
  <UContainer>
    <div class="w-full flex flex-row justify-center items-center pt-24 pb-4">
      <img src="~/assets/img/site-logo.png" class="w-10 h-10 me-4" />
      <span class="text-4xl">utils.yankeguo.com</span>
    </div>

    <div class="w-full my-4">
      <hr />
    </div>

    <slot></slot>

    <Footer></Footer>
  </UContainer>
</template>
