<script setup lang="ts">
import {
    ClassroomFeedDisplay,
    DiscussionFeedDisplay,
} from "../stores/feedDisplay";

const route = useRouter();
const path = ref(route.currentRoute.value.path);
</script>

<template>
    <div
        v-if="path.includes('/class')"
        class="sticky mb-[10px] top-[10px] flex gap-1 w-full bg-white rounded-2xl border overflow-clip px-3 z-50 drop-shadow-sm"
    >
        <FeedbarTab
            name="Voting"
            icon="pi pi-arrow-up"
            :display="ClassroomFeedDisplay.VOTING"
        />
        <FeedbarTab
            name="Following"
            icon="pi pi-users"
            :display="ClassroomFeedDisplay.FOLLOWING"
        />
        <FeedbarTab
            name="Explore"
            icon="pi pi-compass"
            :display="ClassroomFeedDisplay.EXPLORE"
        />
    </div>
    <div
        v-if="path.includes('/discussion')"
        class="sticky mb-[10px] top-[10px] flex gap-1 w-full bg-white rounded-xl border overflow-clip px-3 z-50 drop-shadow-sm"
    >
        <FeedbarTab
            name="Trending"
            icon="pi pi-star"
            :display="DiscussionFeedDisplay.TRENDING"
        />
        <FeedbarTab
            name="For you"
            icon="pi pi-sparkles"
            :display="DiscussionFeedDisplay.FOR_YOU"
        />
        <FeedbarTab
            name="Explore"
            icon="pi pi-compass"
            :display="DiscussionFeedDisplay.EXPLORE"
        />
    </div>
</template>
