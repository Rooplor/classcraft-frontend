<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

const isVisible = ref(false);
const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};

const open = () => {
  isVisible.value = true;
};
</script>
<template>
  <slot name="button" :onClick="open" :disabled="!editingClassroom" />
  <Dialog
    v-model:visible="isVisible"
    dismissableMask
    :header="`Feedback for &quot;${editingClassroom?.title}&quot;`"
    position="center"
    :modal="true"
    :draggable="false"
    class="w-full mx-3 m-auto"
    :style="{
      height: '100vh',
      background: '#f8fafc',
    }"
  >
    <NuxtLayout name="feedback" />
  </Dialog>
</template>
