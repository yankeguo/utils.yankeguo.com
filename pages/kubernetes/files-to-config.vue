<script setup lang="ts">
import { Base64 } from "js-base64";

definePageMeta({
  utilityGroup: "Kubernetes",
  utilityTitle: "Files to Config",
  utilityDescription:
    "Generate a Kubernetes ConfigMap or Secret from contents of files",
});

const name = ref("name");
const namespace = ref("");
const type = ref("ConfigMap");
const files = ref({});

const typeOptions = ["ConfigMap", "Secret"];

async function onFilesChanged(elem: any) {
  const data: Record<string, any> = {};
  for (const file of elem.target.files) {
    const res: any = await new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function (event: any) {
        resolve(event.target.result);
      };
      reader.onerror = function (e) {
        reject(e);
      };
      reader.readAsBinaryString(file);
    });
    data[file.name] = Base64.encode(res);
  }
  files.value = data;
}

const resource = computed(() => {
  let res: any = {};
  if (type.value === "ConfigMap") {
    res = {
      apiVersion: "v1",
      kind: "ConfigMap",
      metadata: {
        name: name.value,
      },
      binaryData: files.value,
    };
  } else {
    res = {
      apiVersion: "v1",
      kind: "Secret",
      metadata: {
        name: name.value,
      },
      type: "Opaque",
      data: files.value,
    };
  }
  if (namespace.value) {
    res.metadata.namespace = namespace.value;
  }
  return res;
});
</script>

<template>
  <PageWithSidebar>
    <template #sidebar>
      <div class="grid grid-cols-1 gap-4">
        <UFormGroup label="Name">
          <UInput v-model="name"></UInput>
        </UFormGroup>
        <UFormGroup label="Namespace">
          <UInput v-model="namespace"></UInput>
        </UFormGroup>
        <UFormGroup label="Type">
          <USelect v-model="type" :options="typeOptions"></USelect>
        </UFormGroup>
        <UFormGroup label="Files">
          <input
            @change="onFilesChanged"
            type="file"
            id="input-files"
            class="mb-3 w-full"
            name="files"
            multiple
          />
        </UFormGroup>
      </div>
    </template>
    <template #default>
      <ResourceOutput :resource="resource"></ResourceOutput>
    </template>
  </PageWithSidebar>
</template>
