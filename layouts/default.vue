<script setup lang="ts"></script>

<template>
    <Toast position="top-center" group="tc" />
    <div class="flex bg-gray-50 min-h-screen">
        <NuxtLayout name="sidebar" class="px-2" />
        <slot />
        <NuxtLayout name="toolsbar" class="px-2" />
    </div>
</template>
