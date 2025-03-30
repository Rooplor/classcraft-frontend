<script setup lang="ts">
import type { IField, IFormSubmission } from "../types/Form";

const props = defineProps<{
  userFormSubmission: IFormSubmission;
  feedbackForm: IField[];
}>();

const { submitFeedbackForm } = useClassroomForm();
const toast = useToast();

const formData = ref<{ [key: string]: any }>({});
const onSubmit = async (event: Event) => {
  event.preventDefault();

  const res = await submitFeedbackForm(
    props.userFormSubmission.id,
    formData.value
  );

  if (res.success) {
    props.userFormSubmission.feedbackResponse = res.result;

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Feedback submitted successfully",
      life: 3000,
      group: "tc",
    });
  }
};

onMounted(() => {
  if (!props.userFormSubmission.feedbackResponse) return;

  props.feedbackForm.forEach((field) => {
    formData.value[field.name] =
      props.userFormSubmission.feedbackResponse[field.name];
  });
});
</script>
<template>
  <form @submit="onSubmit" class="flex flex-col gap-8">
    <div class="text-start">
      <div class="flex flex-col gap-4">
        <div
          v-for="(field, index) in feedbackForm"
          :key="index"
          class="flex flex-col gap-2"
        >
          <label :for="field.name">{{ field.name }}</label>
          <InputText
            :id="field.name"
            v-model="formData[field.name]"
            :required="field.required"
            :type="field.type"
            :value="formData[field.name]"
            :disabled="userFormSubmission.feedbackResponse"
          />
        </div>
      </div>
    </div>
    <Button
      type="submit"
      rounded
      size="large"
      class="font-medium"
      :disabled="userFormSubmission.feedbackResponse"
    >
      {{
        userFormSubmission.feedbackResponse
          ? "Thank you for your feedback"
          : "Submit Feedback"
      }}
    </Button>
  </form>
</template>
