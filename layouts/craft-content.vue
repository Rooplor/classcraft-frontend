<script setup lang="ts">
const mockContent = [
    {
        title: "Introduction to Astro",
        content: "This is the content of the class",
        activityGuide: [
            "1. This is the #1 activity guide",
            "2. This is the #2 activity guide",
        ],
        presentationGuide: ["Guide #1", "Guide #2 xxx"],
    },
    {
        title: "Introduction to Astro",
        content: "This is the content of the class",
        activityGuide: [
            "1. This is the #1 activity guide",
            "2. This is the #2 activity guide",
        ],
        presentationGuide: ["Guide #1", "Guide #2"],
    },
    {
        title: "Introduction to Astro",
        content: "This is the content of the class",
        activityGuide: [
            "1. This is the #1 activity guide",
            "2. This is the #2 activity guide",
        ],
        presentationGuide: ["Guide #1", "Guide #2"],
    },
];
</script>
<template>
    <div>
        <div>
            <div class="flex flex-col gap-4">
                <ContentCard
                    v-for="(content, index) in mockContent"
                    :key="index"
                    :title="content.title"
                    :content="content.content"
                    :activityGuides="content.activityGuide"
                    :presentationGuide="content.presentationGuide"
                />
            </div>
        </div>
    </div>
</template>
