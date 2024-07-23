<script setup lang="ts">
import { Base64 } from "js-base64";
import * as openpgp from "openpgp";

definePageMeta({
  utilityGroup: "OpenPGP",
  utilityTitle: "Encryption",
  utilityDescription: "Encrypt a message using OpenPGP",
});

const valPublicKey = ref("");
const valContent = ref("");

const outArmored = ref("");
const outBinary = ref("");

onMounted(async () => {
  valPublicKey.value = localStorage.getItem("openpgp-public-key") || "";

  watch(
    [valPublicKey, valContent],
    async () => {
      try {
        localStorage.setItem("openpgp-public-key", valPublicKey.value);
        const publicKey = await openpgp.readKey({
          armoredKey: valPublicKey.value,
        });
        const armored = (await openpgp.encrypt({
          message: await openpgp.createMessage({ text: valContent.value }),
          encryptionKeys: publicKey,
          format: "armored",
        })) as string;
        const binary = (await openpgp.encrypt({
          message: await openpgp.createMessage({ text: valContent.value }),
          encryptionKeys: publicKey,
          format: "binary",
        })) as Uint8Array;
        outArmored.value = armored;
        outBinary.value = Base64.fromUint8Array(binary);
      } catch (e) {
        if (e instanceof Error) {
          outArmored.value = e.toString();
          outBinary.value = e.toString();
        } else {
          outArmored.value = `${e}`;
          outBinary.value = `${e}`;
        }
      }
    },
    { immediate: true },
  );
});
</script>

<template>
  <PageWithSidebar>
    <template #sidebar>
      <div class="grid grid-cols-1 gap-4">
        <UFormGroup label="GPG Public Key">
          <UTextarea rows="12" v-model="valPublicKey"></UTextarea>
        </UFormGroup>
        <UFormGroup label="Content">
          <UTextarea rows="12" v-model="valContent"></UTextarea>
        </UFormGroup>
      </div>
    </template>
    <template #default>
      <div class="flex flex-col gap-4">
        <Label>Armored</Label>
        <UTextarea rows="24" disabled v-model="outArmored"></UTextarea>
        <Label>Binary (Base64)</Label>
        <UTextarea rows="24" disabled v-model="outBinary"></UTextarea>
      </div>
    </template>
  </PageWithSidebar>
</template>
