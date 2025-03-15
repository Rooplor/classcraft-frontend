<script setup lang="ts">
import { getFileNameFromUrl } from '../composables/file';

defineProps<{
  file: string;
  index: number;
}>();


</script>

<template>
  <a
    :href="file"
    target="_blank"
    class="border border-gray-200 rounded-lg p-4 bg-white hover:bg-slate-50 duration-200"
  >
    <div class="flex justify-between items-center gap-2">
      <div class="flex gap-2 items-center">
        <i class="pi pi-file text-primary rounded-lg p-2 bg-primary-50" />
        <p>{{ getFileNameFromUrl(file) }}</p>
      </div>
    </div>
  </a>
</template>
