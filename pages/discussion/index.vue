<script setup lang="ts">
import { mockDiscussions } from "../../types/Discussion";

const value = ref("Pending");
const options = ref(["Pending", "Closed"]);
</script>

<template>
    <div class="w-full max-w-screen-lg mx-auto px-2">
        <Feedbar />
        <div class="flex flex-col gap-4 pt-6 pb-[10px]">
            <div class="flex justify-between">
                <SelectButton
                    v-model="value"
                    :options="options"
                    aria-labelledby="basic"
                />

                <Button severity="info">
                    <p><i class="pi pi-plus" /> Add discussion</p>
                </Button>
            </div>
            <div class="space-y-[10px]">
                <DiscussionItem
                    v-for="(discussion, index) in mockDiscussions"
                    :key="index"
                    :discussion="discussion"
                />
            </div>
        </div>
    </div>
</template>
