<script setup lang="ts">
import YAML from "yaml";
import { Codemirror } from "vue-codemirror";

const keyFormat = "default-resource-format";
const formatJSON = "JSON";
const formatYAML = "YAML";

const props = defineProps<{
  resource: any;
}>();

const { resource } = toRefs(props);

const format = ref(localStorage.getItem(keyFormat) || formatYAML);

watch(format, () => {
  localStorage.setItem(keyFormat, format.value);
});

const resourceString = computed(() => {
  if (format.value.toUpperCase() === formatYAML) {
    return YAML.stringify(resource.value);
  } else {
    return JSON.stringify(resource.value, null, 2);
  }
});

async function doCopy(s: string) {
  const toast = useToast();
  try {
    await navigator.clipboard.writeText(s);
    toast.add({ title: "Copied" });
  } catch (e) {
    toast.add({ title: `${e}`, color: "red" });
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div class="w-full py-3 flex flex-row justify-between">
      <USelect v-model="format" :options="[formatYAML, formatJSON]"></USelect>
      <UButton
        @click="doCopy(resourceString)"
        variant="ghost"
        icon="i-mdi-content-copy"
        label="Copy"
      ></UButton>
    </div>
    <hr />
    <div class="w-full">
      <codemirror
        ref="codemirror"
        :disabled="true"
        :indent-with-tab="true"
        :tab-size="2"
        :model-value="resourceString"
      ></codemirror>
    </div>
  </div>
</template>
