<script setup lang="ts">
import { useFeedDisplayStore } from "../stores/feedDisplay";

defineProps({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: "",
    },
    display: { require: true },
});

const router = useRouter();
const path = ref(router.currentRoute.value.path);

const feedDisplayStore = useFeedDisplayStore();
const { classroomFeedDisplay, discussionFeedDisplay } =
    storeToRefs(feedDisplayStore);

const handleFeedTab = (display: number) => {
    if (path.value.includes("/class")) {
        feedDisplayStore.setClassroomFeedDisplay(display);
        router.push("/class");
    } else {
        feedDisplayStore.setDiscussionFeedDisplay(display);
        router.push("/discussion");
    }
};
</script>
<template>
    <button
        @click="handleFeedTab(display)"
        class="bg-white p-3 w-full text-center border-b-4 hover:bg-gray-100 hover:border-b-gray-100 duration-200"
        v-ripple
        :class="
            (path.includes('/class') && classroomFeedDisplay === display) ||
            (path.includes('/discussion') && discussionFeedDisplay === display)
                ? 'border-primary-500 text-primary-500 hover:!border-primary-500'
                : 'border-white'
        "
    >
        <i :class="icon" />
        {{ name }}
    </button>
</template>
