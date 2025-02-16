<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";
import { EAttendeeStatus, type IFormSubmission } from "../types/Form";

const classroomStore = useClassroomStore();
const toast = useToast();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const {
  getClassroomFormSubmission,
  getFormQuestions,
  setApprovalStatus: setApprovalStatusApi,
} = useClassroomForm();

const formSubmission = ref<IFormSubmission[]>(
  (await getClassroomFormSubmission(editingClassroom.value.id)).result || []
);
const formQuestions = ref(
  (await getFormQuestions(editingClassroom.value.id)).result || {}
);

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
      ...submission,
      ...submission.responses,
    };
  });
});

const setApprovalStatus = async (id: string, status: boolean) => {
  const submission = formSubmission.value.find((item) => item.id === id);
  if (submission) {
    submission.approvedByOwner = status;
  }

  const res = await setApprovalStatusApi(id, status);
  if (res.success) {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Approval status updated",
      group: "tc",
      life: 1000,
    });
  }
};
</script>
<template>
  <div
    class="p-2 border border-primary rounded-lg font-medium bg-primary-50 text-primary inline-block mb-4"
  >
    <i class="pi pi-users" /> {{ formSubmission.length }} /
    {{ editingClassroom.capacity }} people registered
  </div>
  <DataTable
    :value="formattedFormSubmission"
    stripedRows
    tableStyle="min-width: 50rem"
  >
    <Column field="userDetail" header="User">
      <template #body="{ data }">
        <nuxt-link
          :to="`/user/${data.userDetail.id}`"
          class="flex items-center gap-2"
        >
          <Avatar :image="data.userDetail.profilePicture" shape="circle" />
          <span>{{ data.userDetail.username }}</span>
        </nuxt-link>
      </template>
    </Column>
    <Column field="approvedByOwner" header="Registration">
      <template #body="slotProps">
        <button
          v-if="slotProps.data.approvedByOwner"
          @click="setApprovalStatus(slotProps.data.id, false)"
        >
          <Tag severity="success" value="Approved" />
        </button>
        <button v-else @click="setApprovalStatus(slotProps.data.id, true)">
          <Tag severity="warn" value="Pending" />
        </button>
      </template>
    </Column>
    <Column field="attendeesStatus" header="Status">
      <template #body="slotProps">
        <Tag
          v-if="slotProps.data.attendeesStatus === EAttendeeStatus.Present"
          severity="success"
          value="Checked In"
        />
        <Tag
          v-else-if="slotProps.data.attendeesStatus === EAttendeeStatus.Absent"
          severity="danger"
          value="Absent"
        />
        <Tag
          v-else-if="slotProps.data.attendeesStatus === EAttendeeStatus.Late"
          severity="warn"
          value="Late"
        />
        <Tag
          v-else-if="slotProps.data.attendeesStatus === EAttendeeStatus.Pending"
          severity="warn"
          value="Pending"
        />
        <Tag
          v-else-if="slotProps.data.attendeesStatus === EAttendeeStatus.Not_Going"
          severity="danger"
          value="Not Going"
        />
      </template>
    </Column>
    <Column
      v-for="column in columns"
      :field="column.field"
      :header="column.header"
    >
    </Column>
    <template #empty>
      <p class="text-slate-500">No submissions</p>
    </template>
  </DataTable>
</template>
