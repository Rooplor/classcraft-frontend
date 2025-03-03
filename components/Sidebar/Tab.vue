<script setup lang="ts">
defineProps({
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

watch(router.currentRoute, () => {
  path.value = router.currentRoute.value.path;
});
</script>
<template>
  <div v-ripple class="w-full rounded-lg hover:bg-slate-100 duration-100">
    <nuxt-link
      :to="to"
      :class="
        (path === to &&
          'text-primary-500 bg-primary-100 hover:!bg-primary-100') +
        ` ${isSidebarOpen ? 'p-2 justify-between' : 'p-1 justify-center'}`
      "
      class="flex items-start"
    >
      <div class="flex items-center gap-2 w-full">
        <img
          v-if="classroom?.coverImage"
          :src="classroom?.coverImage"
          :alt="classroom?.title"
          class="w-full h-full max-w-10 max-h-10 rounded-md aspect-square object-cover"
        />
        <div
          v-else-if="!label"
          class="flex justify-center items-center w-10 h-10 bg-slate-200 border border-slate-300 text-slate-400 rounded-md aspect-square"
        >
          <i class="pi pi-image" />
        </div>
        <i
          v-else
          :class="icon + ' pl-3 p-2'"
          :style="'font-size: 1.3rem'"
        />
        <p v-if="isSidebarOpen" class="truncate">
          {{ classroom?.title || label }}
        </p>
      </div>
      <span
        v-if="classroom?.published"
        class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-500 rounded-full"
      >
        <span
          class="absolute w-1.5 h-1.5 bg-green-500 top-0 left-0 rounded-full animate-ping"
        />
      </span>
    </nuxt-link>
  </div>
</template>
