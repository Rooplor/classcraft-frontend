<script setup lang="ts">
import type { IContent } from "../types/Content";

defineProps({
    content: {
        type: Object as PropType<IContent>,
        required: true,
    },
});

const emit = defineEmits(["edit"]);
</script>
<template>
    <div class="border rounded-3xl bg-white overflow-clip divide-y">
        <div class="p-4">
            <div class="flex justify-between items-center">
                <p class="text-xl font-bold">
                    <span v-if="content.title">{{ content.title }}</span>
                    <span v-else class="text-slate-300">No Title</span>
                </p>
                <Button
                    severity="secondary"
                    icon="pi pi-pencil"
                    label="Edit"
                    @click="emit('edit')"
                />
            </div>
        </div>
        <div class="p-4 space-y-8">
            <p class="whitespace-pre">
                <span v-if="content.content">{{ content.content }}</span>
                <span v-else class="text-slate-300">No Content</span>
            </p>
            <div class="space-y-2">
                <small class="text-slate-400">Activity Guides</small>
                <div class="space-y-2">
                    <p
                        v-if="content.activityGuides.length === 0"
                        class="text-slate-300"
                    >
                        No Activity Guide
                    </p>
                    <div
                        v-else
                        v-for="(guide, index) in content.activityGuides"
                        :key="index"
                        class="p-4 bg-slate-100 text-slate-500 rounded-xl flex gap-2 items-center duration-150 hover:bg-slate-200"
                    >
                        <p class="text-slate-400">{{ index + 1 }}.</p>
                        <p>
                            <span v-if="guide.activityGuide">{{
                                guide.activityGuide
                            }}</span>
                            <span v-else class="text-slate-300"
                                >No Activity Guide</span
                            >
                        </p>
                    </div>
                </div>
            </div>
            <div class="space-y-2">
                <small class="text-slate-400"> Presentation Guides </small>
                <div class="grid grid-cols-2 gap-2">
                    <p
                        v-if="content.presentationGuides.length === 0"
                        class="text-slate-300"
                    >
                        No Presentation Guide
                    </p>
                    <div
                        v-else
                        v-for="(guide, index) in content.presentationGuides"
                        :key="index"
                        class="aspect-video bg-slate-100 text-slate-500 rounded-xl p-4 duration-150 hover:bg-slate-200"
                    >
                        <p class="whitespace-pre flex justify-between">
                            <span v-if="guide.presentationGuide">{{
                                guide.presentationGuide
                            }}</span>
                            <span v-else class="text-slate-300"
                                >No Presentation Guide</span
                            >
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
