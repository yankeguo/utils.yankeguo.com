<script setup lang="ts">
import { Base64 } from "js-base64";

definePageMeta({
  utilityGroup: "Kubernetes",
  utilityTitle: "Dockerconfig",
  utilityDescription: "Generate a Kubernetes Secret for a Docker registry",
});

const name = ref("secret-name");
const namespace = ref("");
const registry = ref("registry.com");
const username = ref("username");
const password = ref("password");

const resource = computed(() => {
  const auths: Record<string, any> = {};
  auths[registry.value] = {
    auth: Base64.encode(username.value + ":" + password.value),
  };
  const data = Base64.encode(JSON.stringify({ auths }));
  const res = {
    apiVersion: "v1",
    kind: "Secret",
    metadata: {
      name: name.value,
    } as any,
    type: "kubernetes.io/dockerconfigjson",
    data: {
      ".dockerconfigjson": data,
    },
  };
  if (namespace.value) {
    res.metadata["namespace"] = namespace.value;
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
        <UFormGroup label="Registry">
          <UInput v-model="registry"></UInput>
        </UFormGroup>
        <UFormGroup label="Username">
          <UInput v-model="username"></UInput>
        </UFormGroup>
        <UFormGroup label="Password">
          <UInput v-model="password"></UInput>
        </UFormGroup>
      </div>
    </template>
    <template #default>
      <ResourceOutput :resource="resource"></ResourceOutput>
    </template>
  </PageWithSidebar>
</template>
