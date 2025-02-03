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
      approvedByOwner: submission.approvedByOwner,
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
  <div
    class="p-4 border border-primary rounded-lg font-medium bg-primary-50 text-primary inline-block text-lg mb-4"
  >
    {{ formSubmission.length }} people registered
  </div>
  <DataTable
    :value="formattedFormSubmission"
    stripedRows
    tableStyle="min-width: 50rem"
  >
    <Column field="userDetail" header="User id">
      <template #body="{ data }">
        <div
          @click="
            $router.push({
              name: 'user',
              params: { id: data.id },
            })
          "
          class="flex items-center gap-2"
        >
          <img
            :alt="data.profilePicture"
            :src="data.profilePicture"
            style="width: 32px"
          />
          <span>{{ data.username }}</span>
        </div>
      </template>
    </Column>
    <Column field="approvedByOwner" header="Status">
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.approvedByOwner"
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
