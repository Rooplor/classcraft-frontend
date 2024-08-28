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
        class="rounded-2xl p-3 py-4 hover:bg-blue-100 duration-100 flex items-center gap-2"
        :class="path === to ? 'bg-blue-100' : ''"
    >
        <!-- TODO: Change to class image -->
         
        <div class="h-6 rounded-md bg-blue-500 aspect-square" />
        {{ name }}
    </nuxt-link>
</template>
