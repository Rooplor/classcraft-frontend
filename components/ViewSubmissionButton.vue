<script setup>
const isSubmissionDialogVisible = ref(false);
</script>
<template>
  <div @click="isSubmissionDialogVisible = true">
    <slot />
  </div>
  <Dialog
    v-model:visible="isSubmissionDialogVisible"
    :header="`Submission of ${editingClassroom?.title}`"
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
