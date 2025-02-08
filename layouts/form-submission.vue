<script setup lang="ts">
import type { IFormSubmission } from "../types/Form";

const layoutCustomProps = useAttrs();

const userFormSubmission: IFormSubmission =
  layoutCustomProps.userFormSubmission as IFormSubmission;

const customQuestions = computed(() => {
  return Object.keys(userFormSubmission.responses).filter(
    (key) => key !== "Full Name" && key !== "Email" && key !== "Phone"
  );
});
</script>
<template>
  <div class="flex flex-col gap-8">
    <div>
      <p class="inline-flex items-center gap-1 text-slate-400 mb-2">
        <i class="pi pi-id-card" />
        Personal Information
      </p>
      <div class="flex flex-col gap-4 border rounded-2xl p-4 bg-slate-50">
        <div class="flex flex-col gap-2">
          <label class="text-sm text-slate-500" for="Full Name"
            >Full Name</label
          >
          <p>
            {{ userFormSubmission.responses["Full Name"] }}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-slate-500" for="Email">Email</label>
          <p>{{ userFormSubmission.responses.Email }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm text-slate-500" for="Phone">Phone</label>
          <p>{{ userFormSubmission.responses.Phone }}</p>
        </div>
      </div>
    </div>
    <div v-if="customQuestions.length > 0">
      <p class="inline-flex items-center gap-1 text-slate-400 mb-2">
        <i class="pi pi-question-circle" />
        Other Questions
      </p>
      <div class="flex flex-col gap-4 border rounded-2xl p-4 bg-slate-50">
        <div
          v-for="(q, index) in customQuestions"
          :key="index"
          class="flex flex-col gap-2"
        >
          <label class="text-sm text-slate-500" for="Full Name">{{ q }}</label>
          <p>{{ userFormSubmission.responses[q] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
