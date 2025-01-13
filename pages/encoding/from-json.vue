<script setup lang="ts">
definePageMeta({
    utilityGroup: "Encoding",
    utilityTitle: "From JSON",
    utilityDescription: "Convert a JSON object to YAML or reformat it",
});

const valContent = ref("{}");

const resource = computed(() => {
    try {
        return JSON.parse(valContent.value);
    } catch (e: any) {
        return { error: e.toString() };
    }
})
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