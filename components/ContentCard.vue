<script setup lang="ts">
defineProps<{
    title: string;
    content: string;
    activityGuides: string[];
    presentationGuide: string[];
}>();
</script>
<template>
    <div class="border rounded-3xl overflow-clip">
        <p class="p-6 bg-white border-b text-xl font-bold">
            {{ title }}
        </p>
        <div class="p-6 bg-white space-y-8">
            <div v-html="content" />
            <div class="space-y-2">
                <div
                    v-for="(guide, index) in activityGuides"
                    :key="index"
                    class="p-4 bg-gray-100 rounded-xl"
                >
                    {{ guide }}
                </div>
            </div>
            <div class="flex gap-2">
                <div
                    v-for="(guide, index) in presentationGuide"
                    :key="index"
                    class="w-[32rem] h-[18rem] aspect-square bg-slate-500 rounded-2xl p-4"
                >
                    {{ guide }}
                </div>
            </div>
        </div>
    </div>
</template>
