<script setup lang="ts">
import { type IClassroom } from "../../types/Classroom";

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const isVisible = ref(false);

const open = () => {
  isVisible.value = true;
};
</script>
<template>
  <slot name="button" :onClick="open" :disabled="!editingClassroom" />
  <Dialog
    v-model:visible="isVisible"
    dismissableMask
    header="Class Content"
    :modal="true"
    :draggable="false"
    class="w-full max-w-screen-lg m-auto"
    :style="{
      height: '100vh',
      background: '#f8fafc',
    }"
  >
    <NuxtLayout name="craft-content" />
  </Dialog>
</template>
