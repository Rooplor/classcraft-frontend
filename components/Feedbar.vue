<script setup lang="ts">
const route = useRouter();
const path = ref(route.currentRoute.value.path);
</script>

<template>
    <div
        v-if="path.includes('/class')"
        class="sticky mb-[10px] top-[10px] flex gap-1 w-[calc(100%-0.5rem)] bg-white rounded-full border overflow-clip px-5 z-50 drop-shadow-sm"
    >
        <FeedbarTab
            name="Explore"
            icon="pi pi-compass"
            :display="ClassroomFeedDisplay.EXPLORE"
        />
        <FeedbarTab
            name="Following"
            icon="pi pi-users"
            :display="ClassroomFeedDisplay.FOLLOWING"
        />
        <FeedbarTab
            name="Voting"
            icon="pi pi-arrow-up"
            :display="ClassroomFeedDisplay.VOTING"
        />
    </div>
    <div
        v-if="path.includes('/discussion')"
        class="sticky mb-[10px] top-[10px] flex gap-1 w-[calc(100%-0.5rem)] bg-white rounded-full border overflow-clip px-5 z-50 drop-shadow-sm"
    >
        <FeedbarTab
            name="For you"
            icon="pi pi-sparkles"
            :display="DiscussionFeedDisplay.FOR_YOU"
        />
        <FeedbarTab
            name="Trending"
            icon="pi pi-star"
            :display="DiscussionFeedDisplay.TRENDING"
        />
        <FeedbarTab
            name="Explore"
            icon="pi pi-compass"
            :display="DiscussionFeedDisplay.EXPLORE"
        />
    </div>
</template>
