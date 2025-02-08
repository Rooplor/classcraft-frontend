<script setup lang="ts">
const sidebarStore = useSidebarStore();
const { isSidebarOpen, isDrawerOpen } = storeToRefs(sidebarStore) as {
  isSidebarOpen: Ref<boolean>;
  isDrawerOpen: Ref<boolean>;
};

const user = useCurrentUser();
</script>

<template>
  <div v-if="user">
    <Drawer v-model:visible="isDrawerOpen" header="ClassCraft">
      <template #container="{ closeCallback }">
        <div class="overflow-auto h-full">
          <SidebarTemplate :closeCallback="closeCallback" />
        </div>
      </template>
    </Drawer>
    <div class="absolute hidden md:block top-0 h-[100vh] z-[100] md:sticky ">
      <div
        class="relative flex flex-col overflow-y-auto justify-between h-full screen pb-0 bg-white  basis-64 overflow-clip duration-500"
        :class="isSidebarOpen ? 'w-64 py-4' : 'w-20 py-4'"
      >
        <SidebarTemplate />
      </div>
    </div>
  </div>
</template>
