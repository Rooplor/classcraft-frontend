<script setup lang="ts">
import type { IFormSubmission } from "../types/Form";

defineProps<{
  userFormSubmission?: IFormSubmission;
  classroomTitle: string;
}>();

const isSubmissionDialogVisible = ref(false);
</script>
<template>
  <div class="p-4 border rounded-xl bg-slate-50 flex flex-col gap-4">
    <div class="flex justify-center items-center gap-2">
      <img
        :src="userFormSubmission?.userDetail?.profilePicture"
        :alt="`${userFormSubmission?.userDetail?.username} profile picture`"
        class="w-8 h-8 rounded-full"
      />
      <p class="text-slate-500">Thank you for joining</p>
    </div>
    <Button
      label="View my submission"
      severity="secondary"
      @click="isSubmissionDialogVisible = true"
    />
  </div>
  <Dialog
    v-model:visible="isSubmissionDialogVisible"
    :header="`Your submission for &quot;${classroomTitle}&quot;`"
    :modal="true"
    dismissableMask
    :draggable="false"
    position="center"
    class="w-full max-w-screen-sm m-auto"
    :style="{
      'border-radius': '1.5rem',
    }"
  >
    <NuxtLayout
      name="form-submission"
      :userFormSubmission="userFormSubmission"
    />
  </Dialog>
</template>
