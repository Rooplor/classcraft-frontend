<script setup lang="ts">
const sidebarStore = useSidebarStore();
const { isSidebarOpen, isDrawerOpen } = storeToRefs(sidebarStore) as {
    isSidebarOpen: Ref<boolean>;
    isDrawerOpen: Ref<boolean>;
};
</script>

<template>
    <Drawer v-model:visible="isDrawerOpen" header="ClassCraft">
        <template #container="{ closeCallback }">
            <div class="pt-6 px-3 overflow-auto">
                <SidebarTemplate :closeCallback="closeCallback" />
            </div>
        </template>
    </Drawer>
    <div class="absolute hidden md:block top-0 h-[100vh] z-[100] md:sticky p-2">
        <div
            class="relative flex flex-col overflow-y-auto justify-between h-full screen pb-0 bg-white border basis-64 rounded-3xl overflow-clip duration-500"
            :class="isSidebarOpen ? 'w-64 py-4 p-2' : 'w-20 p-1 py-4'"
        >
            <SidebarTemplate />
        </div>
    </div>
</template>
