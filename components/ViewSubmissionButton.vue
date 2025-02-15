<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";

const isSubmissionDialogVisible = ref(false);
const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
</script>
<template>
  <div @click="isSubmissionDialogVisible = true">
    <slot />
  </div>
  <Dialog
    v-model:visible="isSubmissionDialogVisible"
    :header="`Submissions of &quot;${editingClassroom?.title}&quot;`"
    :modal="true"
    :draggable="false"
    dismissableMask
    position="center"
    class="w-full mx-3 m-auto"
    :style="{
      height: '100vh',
    }"
  >
    <NuxtLayout name="classroom-form-submission" />
  </Dialog>
</template>
