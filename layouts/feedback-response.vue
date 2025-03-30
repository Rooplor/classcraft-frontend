<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const { getClassroomFeedbackResponses, getFormById } = useClassroomForm();
const questions: Ref<{ id: number; question: string }[]> = ref([]);
const feedbackResponses = ref<object[]>(
  (await getClassroomFeedbackResponses(editingClassroom.value.id)).result || []
);

const formattedFormSubmission = computed(() => {
  return feedbackResponses.value.map((submission: any) => {
    return {
      userDetail: submission.userDetail,

      ...Object.keys(submission.feedbackResponse).reduce(
        (acc: any, key: string) => {
          acc[key.toUpperCase()] = submission.feedbackResponse[key];
          return acc;
        },
        {}
      ),
    };
  });
});

const columns = computed(() => {
  return questions.value.map((key) => {
    return {
      field: key.question.toUpperCase(),
      header: key.question,
    };
  });
});

if (editingClassroom.value) {
  let res = await getFormById(editingClassroom.value.id);
  if (res.success) {
    const { result } = res;

    questions.value = result.feedback.map((field, index) => ({
      id: index,
      question: field.name,
    }));
  }
}
</script>
<template>
  <DataTable
    :value="formattedFormSubmission"
    stripedRows
    tableStyle="min-width: 50rem"
  >
    <!-- <Column field="userDetail" header="User">
      <template #body="{ data }">
        <nuxt-link
          :to="`/user/${data.userDetail.id}`"
          class="flex items-center gap-2 hover:text-primary duration-150"
        >
          <Avatar :image="data.userDetail.profilePicture" shape="circle" />
          <span>{{ data.userDetail.username }}</span>
        </nuxt-link>
      </template>
    </Column> -->
    <Column
      v-for="column in columns"
      :field="column.field"
      :header="column.header"
    />
    <template #empty>
      <p class="text-slate-500">No submissions</p>
    </template>
  </DataTable>
</template>
