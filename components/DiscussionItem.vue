<script setup lang="ts">
import { type IDiscussion } from "../types/Discussion";
defineProps({
    discussion: {
        type: Object as PropType<IDiscussion>,
        required: true,
    },
});
</script>
<template>
    <div
        class="flex gap-6 bg-white border rounded-3xl p-5 duration-150 hover:drop-shadow-sm"
    >
        <div class="w-full flex flex-col gap-4">
            <h1 class="font-bold text-xl">{{ discussion.title }}</h1>
            <p class="text-slate-500">
                {{ discussion.description }}
            </p>
            <div class="w-full flex justify-end gap-2">
                <Button
                    icon="pi pi-arrow-up"
                    severity="info"
                    rounded
                    outlined
                    :label="discussion.upvotes.toString()"
                />
                <Button @click.prevent=""> Create class </Button>
            </div>
        </div>
    </div>
</template>
