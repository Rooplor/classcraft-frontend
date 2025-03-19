<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";
import { type IFormSubmission } from "../types/Form";
import type { IUser } from "../types/User";

const classroomStore = useClassroomStore();
const toast = useToast();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const {
  getClassroomFormSubmission,
  getFormQuestions,
  getFormCSV,
  getUserInClassroom,
  setApprovalStatus: setApprovalStatusApi,
} = useClassroomForm();

const usersInClassroom = ref<Partial<IUser>[]>([]);

try {
  let res = await getUserInClassroom(editingClassroom.value.id.toString());

  if (res.success) {
    usersInClassroom.value = res.result;
  }
} catch (error) {
  console.error("Error getting users in classroom:", error);
}

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

const handleExportCSV = async () => {
  const res = await getFormCSV(editingClassroom.value.id);
  if (res) {
    const blob = new Blob([res], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Submissions of ${editingClassroom.value.title}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};
</script>
<template>
  <div class="flex justify-between items-center gap-2 mb-4">
    <div class="flex gap-2">
      <div
        class="p-2 border rounded-lg font-medium"
        :class="{
          'bg-green-50 text-green-600 border-green-400':
            editingClassroom.capacity
              ? formSubmission.length <= editingClassroom.capacity
              : true,
          'bg-yellow-50 text-yellow-500 border-yellow-400':
            editingClassroom.capacity
              ? formSubmission.length > editingClassroom.capacity
              : false,
        }"
      >
        <i class="pi pi-users" /> {{ usersInClassroom.length }} /
        {{ editingClassroom.capacity }} people approved
      </div>
    </div>
    <Button
      severity="secondary"
      label="Export to CSV"
      icon="pi pi-download"
      @click="handleExportCSV"
    />
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
