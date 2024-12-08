<script setup lang="ts">
definePageMeta({
    layout: false,
});
useHead({
    title: "404 · ClassCraft",
    meta: [
        {
            name: "description",
            content: "Page not found.",
        },
        {
            name: "keywords",
            content: "ClassCraft, 404",
        },
    ],
});
</script>
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="text-center">
            <small class="text-base text-gray-500">404</small>
            <h1 class="text-8xl font-bold text-gray-800">Oops!</h1>
            <p class="mt-4 text-2xl text-gray-600 max-w-screen-sm">
                The page you're looking for doesn't exist. <br />
                No worries, we can help you get back to the homepage.
            </p>
            <a
                href="/"
                class="mt-6 inline-flex items-center gap-2 px-6 py-3 text-white bg-primary rounded-lg duration-150 hover:bg-primary-600"
            >
                <i class="pi pi-arrow-left" />
                Go to Homepage
            </a>
        </div>
    </div>
</template>
