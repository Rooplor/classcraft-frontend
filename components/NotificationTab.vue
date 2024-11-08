<script setup lang="ts">
const props = defineProps<{
    to: string;
}>();
</script>
<template>
    <nuxt-link
        :to="to"
        class="block bg-white px-4 py-6 rounded-xl duration-150 hover:bg-gray-100"
    >
        <slot />
    </nuxt-link>
</template>
