<script setup lang="ts">
defineProps<{
  classMaterials: string[];
}>();
</script>
<template>
  <div>
    <p class="text-xl font-bold mb-4">Class Materials</p>
    <div class="bg-white p-6 border rounded-2xl flex flex-col gap-4">
      <div class="grid grid-cols-1 gap-2">
        <ClassMaterialItem
          v-for="(file, index) in classMaterials"
          :key="index"
          :file="file"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>
