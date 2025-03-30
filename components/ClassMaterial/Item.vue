<script setup lang="ts">
import { getFileNameFromUrl } from '../../composables/file';

defineProps<{
  file: string;
  index: number;
}>();


</script>

<template>
  <a
    :href="file"
    target="_blank"
    class="border rounded-lg p-4 bg-primary-50 hover:bg-primary-100 duration-200 overflow-clip"
  >
    <div class="relative flex justify-between items-center gap-2">
      <div class="absolute top-4 right-4 bg-primary-100 border border-primary-300 rounded-lg w-32 aspect-square"></div>
      <div class="absolute top-4 right-2 bg-primary-100 border border-primary-300 rounded-lg w-32 aspect-square rotate-6"></div>

      <div class="flex gap-2 items-center">
        <p>{{ getFileNameFromUrl(file) }}</p>
      </div>
    </div>
  </a>
</template>
