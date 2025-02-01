<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";
import type { IFormSubmission } from "../types/Form";

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const { getClassroomFormSubmission, getFormQuestions } = useClassroomForm();

const formSubmission = ref<IFormSubmission[]>([]);
const formQuestions = ref({});

const columns = computed(() => {
  return Object.keys(formQuestions.value).map((key) => {
    return {
      field: key,
      header: key,
    };
  });
});

const formattedFormSubmission = computed(() => {
  return formSubmission.value.map((submission) => {
    return {
      ...submission.responses,
      submittedBy: submission.submittedBy,
      isApprovedByOwner: submission.isApprovedByOwner,
    };
  });
});

onMounted(async () => {
  getClassroomFormSubmission(editingClassroom.value.id).then((data) => {
    formSubmission.value = data.result;
  });
  getFormQuestions(editingClassroom.value.id).then((data) => {
    formQuestions.value = data.result;
  });
});
</script>
<template>
  <div>{{ formSubmission.length }} people</div>

  <DataTable
    :value="formattedFormSubmission"
    stripedRows
    tableStyle="min-width: 50rem"
  >
    <Column field="submittedBy" header="User id" />
    <Column field="isApprovedByOwner" header="Status">
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.isApprovedByOwner"
          severity="success"
          value="Approved"
          rounded
        />
        <Tag v-else severity="warn" value="Pending" rounded />
      </template>
    </Column>
    <Column
      v-for="column in columns"
      :field="column.field"
      :header="column.header"
    />
  </DataTable>
</template>
