<script setup lang="ts">
const props = defineProps({
    to: {
        type: String,
        required: true,
    },
    classroom: {
        type: Object,
    },
    label: {
        type: String,
    },
    icon: {
        type: String,
    },
});
const router = useRouter();
const path = ref(router.currentRoute.value.path);


const sidebarStore = useSidebarStore();
const { isSidebarOpen } = storeToRefs(sidebarStore) as {
    isSidebarOpen: Ref<boolean>;
};
const op = ref();

watch(router.currentRoute, () => {
    path.value = router.currentRoute.value.path;
});
</script>
<template>
    <div v-ripple class="w-full rounded-xl hover:bg-slate-100 duration-100">
        <nuxt-link
            :to="to"
            :class="
                (path.includes(to) &&
                    'text-primary-500 bg-primary-100 hover:!bg-primary-100') +
                ` ${
                    isSidebarOpen
                        ? 'p-2 justify-between'
                        : 'p-1 justify-center h-16'
                }`
            "
            class="flex items-center min-h-14"
        >
            <div class="flex items-center gap-2">
                <img
                    v-if="classroom?.coverImage"
                    :src="classroom?.coverImage"
                    :alt="classroom?.title"
                    class="w-full h-full max-w-14 max-h-14 rounded-lg aspect-square object-cover"
                />
                <div
                    v-else-if="!label"
                    class="flex justify-center items-center w-14 h-14 bg-slate-200 border border-slate-300 text-slate-400 rounded-lg aspect-square"
                >
                    <i class="pi pi-image" />
                </div>
                <i
                    v-else
                    :class="icon"
                    :style="!isSidebarOpen && 'font-size: 1.5rem'"
                />
                <div v-if="isSidebarOpen" class="space-y-1 overflow-hidden">
                    <div v-if="!label" class="flex gap-1">
                        <Badge
                            :value="
                                classroom?.published ? 'Published' : 'Draft'
                            "
                            :severity="
                                classroom?.published ? 'success' : 'secondary'
                            "
                            size="small"
                        />
                        <div
                            v-if="classroom?.registrationStatus"
                            class="text-[0.6rem] flex items-center text-white bg-orange-500 rounded-full px-0.5"
                        >
                            <i
                                class="pi pi-stop-circle aspect-square animate-fadeout animate-alternate-reverse animate-infinite animate-duration-700"
                            />
                        </div>
                    </div>
                    <p class="w-full truncate">
                        {{ classroom?.title || label }}
                    </p>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>
