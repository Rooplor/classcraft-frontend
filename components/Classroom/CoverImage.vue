<script setup lang="ts">
defineProps<{
  url: string;
  alt: string;
}>();
</script>
<template>
  <div
    v-if="url"
    class="w-96 m-auto aspect-square rounded-2xl overflow-clip lg:w-full"
  >
    <Image :preview="url ? true : false">
      <template #image>
        <img
          :src="url"
          :alt="alt"
          class="w-[52rem] bg-slate-200 aspect-square border rounded-2xl object-cover"
        />
      </template>
      <template #original="slotProps">
        <img
          :src="url"
          :alt="alt"
          :style="slotProps.style"
          @click="slotProps.previewCallback"
          class="w-[52rem] h-full aspect-square object-cover p-2"
        />
      </template>
    </Image>
  </div>
  <div
    v-else
    class="hidden w-full max-w-96 m-auto aspect-square bg-slate-200 border rounded-2xl lg:flex justify-center items-center md:max-w-full"
  >
    <i class="pi pi-image text-slate-400" style="font-size: 4rem" />
  </div>
</template>
