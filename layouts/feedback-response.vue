<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";
import { type IFormSubmission } from "../types/Form";

const MOCK_QUESTIONS = [
  {
    question: "What do you think about the class?",
  },
  {
    question: "What do you think about the teacher?",
  },
];

const MOCK_FEEDBACK_RESPONSES = [
  {
    userDetail: {
      id: 1,
      username: "John Doe",
      profilePicture: "",
    },
    responses: {
      "What do you think about the class?": "It's great",
      "What do you think about the teacher?": "He's awesome",
    },
  },
  {
    userDetail: {
      id: 2,
      username: "Jane Doe",
      profilePicture: "",
    },
    responses: {
      "What do you think about the class?": "It's boring",
      "What do you think about the teacher?": "He's boring",
    },
  },
];

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const { getClassroomFeedbackResponses } = useClassroomForm();

const feedbackResponses = ref<object[]>(
  (await getClassroomFeedbackResponses(editingClassroom.value.id)).result || []
);

console.log(feedbackResponses.value);

const formattedFormSubmission = computed(() => {
  return feedbackResponses.value.map((submission: object) => {
    return {
      userDetail: submission.userDetail,
      ...Object.keys(submission.responses).reduce((acc: any, key: string) => {
        acc[key] = submission.responses[key];
        return acc;
      }, {}),
    };
  });
});

const questions = ref(MOCK_QUESTIONS);
</script>
<template>
  <DataTable
    :value="formattedFormSubmission"
    stripedRows
    tableStyle="min-width: 50rem"
  >
    <Column field="userDetail" header="User">
      <template #body="{ data }">
        <nuxt-link
          :to="`/user/${data.userDetail.id}`"
          class="flex items-center gap-2 hover:text-primary duration-150"
        >
          <Avatar :image="data.userDetail.profilePicture" shape="circle" />
          <span>{{ data.userDetail.username }}</span>
        </nuxt-link>
      </template>
    </Column>
    <Column
      v-for="column in questions"
      :field="column.question"
      :header="column.question"
    />
    <template #empty>
      <p class="text-slate-500">No submissions</p>
    </template>
  </DataTable>
</template>
