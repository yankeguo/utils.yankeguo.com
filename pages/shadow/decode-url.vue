<script setup lang="ts">
import { Base64 } from "js-base64";
import { computed } from "vue";

definePageMeta({
  utilityGroup: "Shadow",
  utilityTitle: "Decode URL",
  utilityDescription: "Decode a Shadowsocks URL to a config object",
});

const textareaPlaceholder =
  "ssr://YzNiMDMxYjliYTgzMGU1ZWQ5NmUyZjAzMzZkMjVlYzNhZjVmZTgzZjg3NjYxYjAwOTI3MDdjNjA1NjNjMmFiNQo=";
const textareaInput = ref("");

const resource = computed(() => {
  let input = textareaInput.value;
  if (!input) {
    return {};
  }
  try {
    if (input.startsWith("ss://")) {
      input = input.substring(5);
    } else if (input.startsWith("ssr://")) {
      input = input.substring(6);
    }
    input = Base64.decode(input);
    let mainAndArgs = input.split("/?");
    let items = mainAndArgs[0].split(":");
    let res: Record<string, any> = {
      server: items[0],
      server_port: Number(items[1]),
      local_address: "0.0.0.0",
      local_port: 1080,
      protocol: items[2],
      method: items[3],
      obfs: items[4],
      password: Base64.decode(items[5]),
    };
    let args = new URLSearchParams(mainAndArgs[1]);
    if (args.has("obfsparam")) {
      res.obfs_param = Base64.decode(args.get("obfsparam") as any);
    }
    return res;
  } catch (e) {
    return { error: e.toString() };
  }
});
</script>

<template>
  <PageWithSidebar>
    <template #sidebar>
      <div class="grid grid-cols-1 gap-4">
        <UFormGroup label="URL">
          <UTextarea
            v-model="textareaInput"
            :placeholder="textareaPlaceholder"
            rows="16"
          ></UTextarea>
        </UFormGroup>
      </div>
    </template>
    <template #default>
      <ResourceOutput :resource="resource"></ResourceOutput>
    </template>
  </PageWithSidebar>
</template>
