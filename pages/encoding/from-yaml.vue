<script setup lang="ts">
import YAML from "yaml";

definePageMeta({
  utilityGroup: "Encoding",
  utilityTitle: "From YAML",
  utilityDescription: "Convert a YAML document to JSON or reformat it",
});

const valContent = ref("");

const resource = computed(() => {
  try {
    let multi = false;
    for (const line of valContent.value.split("\n")) {
      if (line.trim().startsWith("---")) {
        multi = true;
        break;
      }
    }
    return multi
      ? YAML.parseAllDocuments(valContent.value)
      : YAML.parse(valContent.value);
  } catch (e: any) {
    return { error: e.toString() };
  }
});
</script>

<template>
  <PageWithSidebar>
    <template #sidebar>
      <div class="grid grid-cols-1 gap-4">
        <UFormGroup label="Content">
          <UTextarea :rows="12" v-model="valContent"></UTextarea>
        </UFormGroup>
      </div>
    </template>
    <template #default>
      <div class="flex flex-col gap-4">
        <ResourceOutput :resource="resource"></ResourceOutput>
      </div>
    </template>
  </PageWithSidebar>
</template>
