<script setup lang="ts">
defineProps({
    to: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});
const route = useRouter();
const path = ref(route.currentRoute.value.path);

watch(route.currentRoute, () => {
    path.value = route.currentRoute.value.path;
});
</script>
<template>
    <nuxt-link
        :to="to"
        class="flex items-center gap-2 p-3 py-4 duration-100 rounded-2xl hover:bg-blue-100"
        :class="path === to ? 'bg-blue-100' : ''"
    >
        <!-- TODO: Change to class image -->

        <div class="h-6 bg-blue-500 rounded-md aspect-square" />
        {{ name }}
    </nuxt-link>
</template>
