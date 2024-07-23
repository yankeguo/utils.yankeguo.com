<script setup lang="ts">
definePageMeta({
  layout: "fullscreen",
});

const summary = computed(() => useUtilitiesSummary());
</script>

<template>
  <Head>
    <Title>utils.yankeguo.com</Title>
  </Head>

  <div class="flex flex-col items-left pb-4">
    <div v-for="group of summary" v-bind:key="group.group">
      <div class="my-4 font-semibold text-xl flex flex-row items-center">
        <UIcon name="i-mdi-folder-heart-outline" class="me-2"></UIcon>
        <span>{{ group.group }}</span>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <ULink
          :to="item.route"
          v-for="item of group.items"
          class="outline outline-1 rounded-md px-2 py-4 flex flex-col items-center justify-between outline-green-800 hover:bg-green-800 h-40"
        >
          <div class="mb-4 font-semibold">
            <UIcon name="i-mdi-tools" class="me-2"></UIcon>
            <span>{{ item.title }}</span>
          </div>
          <div class="text-center text-sm">{{ item.desc }}</div>
        </ULink>
      </div>
    </div>
  </div>
</template>
