<script setup lang="ts">
import { getFileNameFromUrl } from "../../composables/file";

defineProps<{
  file: string;
  index: number;
  removable: boolean;
}>();

const emit = defineEmits(["remove"]);
</script>

<template>
  <a
    :href="file"
    target="_blank"
    class="group border rounded-lg p-4 bg-primary-50 hover:bg-primary-100 duration-200 overflow-clip"
  >
    <div class="relative flex justify-between items-center gap-2">
      <div
        class="absolute top-4 right-4 bg-primary-100 border border-primary-300 rounded-lg w-32 aspect-square group-hover:-translate-y-2 group-hover:-rotate-3 group-hover:bg-primary-200 duration-200"
      ></div>
      <div
        class="absolute top-4 right-2 bg-primary-100 border border-primary-300 rounded-lg w-32 aspect-square rotate-6 group-hover:-translate-y-1 group-hover:bg-primary-200 group-hover:rotate-[8deg] duration-200"
      ></div>

      <div class="flex gap-4 items-center z-10 truncate">
        <i
          class="pi pi-file text-primary-500 bg-primary-100 p-2 rounded border border-primary-300 group-hover:bg-primary-200 duration-200"
        />
        <p class="truncate">
          {{ getFileNameFromUrl(file) }}
        </p>
      </div>
      <Button
        v-if="removable"
        icon="pi pi-times"
        severity="danger"
        rounded
        text
        @click="(e) => emit('remove', e, file, index)"
      />
    </div>
  </a>
</template>
