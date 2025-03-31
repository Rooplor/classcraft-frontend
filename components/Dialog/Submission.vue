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
  <slot name="button" :onClick="open" />
  <Dialog
    v-model:visible="isVisible"
    :header="`Submissions of &quot;${editingClassroom?.title}&quot;`"
    :modal="true"
    :draggable="false"
    dismissableMask
    position="center"
    class="w-full mx-3 m-auto"
    :style="{
      height: '100vh',
      background: '#f8fafc'
    }"
  >
    <NuxtLayout name="classroom-form-submission" />
  </Dialog>
</template>
