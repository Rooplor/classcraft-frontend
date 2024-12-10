<script setup lang="ts">
const route = useRouter();
const path = ref(route.currentRoute.value.path);
</script>

<template>
    <div
        class="sticky flex gap-2 items-center mb-2 top-0 m-auto p-2 z-20 min-w-72 w-full drop-shadow-sm"
    >
        <DrawerButton />
        <div
            v-if="path.includes('/class')"
            class="flex basis-full gap-1 overflow-auto bg-white rounded-2xl border px-3"
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
            class="flex basis-full gap-1 overflow-auto bg-white rounded-2xl border px-3"
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
    </div>
</template>
