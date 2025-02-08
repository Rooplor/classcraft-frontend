<script setup lang="ts">
const sidebarStore = useSidebarStore();
</script>
<template>
    <div class="md:hidden">
        <Button
            icon="pi pi-bars"
            severity="secondary"
            text
            rounded
            aria-label="Toggle sidebar"
            @click="sidebarStore.toggleDrawer"
        />
    </div>
</template>
