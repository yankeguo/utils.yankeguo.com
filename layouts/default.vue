<script setup lang="ts">
const items = computed(() => {
  const result: Array<{ name: string; value: string; disabled?: boolean }> = [];

  useUtilitiesSummary().forEach((group) => {
    result.push({
      name: group.group,
      value: group.group,
      disabled: true,
    });

    group.items.forEach((item) => {
      result.push({
        name: group.group + " :: " + item.title,
        value: item.route.name,
      });
    });
  });

  return result;
});

const none = "_none";

const router = useRouter();
const route = useRoute();

const selected = ref(route.name?.toString() || none);

watch(
  () => route.path,
  () => {
    selected.value = route.name?.toString() || none;
  },
);

watch(selected, () => {
  router.replace({ name: selected.value });
});
</script>

<template>
  <Head>
    <Title
      >{{ route.meta.utilityGroup }} :: {{ route.meta.utilityTitle }} -
      utils.yankeguo.com</Title
    >
  </Head>

  <UContainer>
    <div
      class="w-full flex flex-col lg:flex-row justify-between items-center py-3"
    >
      <div class="flex flex-col mt-2 mb-4">
        <div class="flex flex-row items-center font-semibold text-xl">
          <UButton
            :to="{ name: 'index' }"
            variant="link"
            icon="i-mdi-home"
            :padded="false"
          ></UButton>
          <UIcon name="i-mdi-chevron-right" class="me-1"></UIcon>
          <span
            >{{ route.meta.utilityGroup }} ::
            {{ route.meta.utilityTitle }}</span
          >
        </div>
        <div>{{ route.meta.utilityDescription }}</div>
      </div>

      <USelect
        v-model="selected"
        :options="items"
        option-attribute="name"
      ></USelect>
    </div>

    <div class="w-full mb-5">
      <hr />
    </div>

    <slot></slot>

    <Footer></Footer>
  </UContainer>
</template>
