<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";
import { EAttendeeStatus, type IFormSubmission } from "../types/Form";

const classroomStore = useClassroomStore();
const toast = useToast();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const { getClassroomFormSubmission, setAttendeeStatus } = useClassroomForm();

const formSubmission = ref<IFormSubmission[]>(
  (await getClassroomFormSubmission(editingClassroom.value.id)).result || []
);

const formattedFormSubmission = computed(() => {
  return formSubmission.value.map((submission) => {
    return {
      ...submission,
      ...submission.responses,
    };
  });
});

const onSelectStatus = async (
  submissionId: string,
  status: EAttendeeStatus,
  day: number
) => {
  try {
    const res = await setAttendeeStatus(submissionId, status, day);

    if (res.success) {
      formattedFormSubmission.value.find(
        (item) => item.id === submissionId
      ).attendeesStatus[day - 1].attendeesStatus = status;

      toast.add({
        severity: "success",
        summary: "Check-in status updated",
        detail: "The check-in status has been updated successfully.",
        group: "tc",
        life: 1000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Could not update status",
      detail: "There was an error updating the status. Please try again later.",
      group: "tc",
      life: 3000,
    });
  }
};
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
          class="flex items-center gap-2"
        >
          <Avatar :image="data.userDetail.profilePicture" shape="circle" />
          <span>{{ data.userDetail.username }}</span>
        </nuxt-link>
      </template>
    </Column>
    <Column
      v-for="(date, index) in editingClassroom.dates"
      :key="index"
      field="attendeesStatus"
      :header="isoToDateWithTimezone(date.date.startDateTime).toDateString()"
    >
      <template #body="slotProps">
        <CheckInOptions
          :submissionId="slotProps.data.id"
          :day="index + 1"
          @on-select="onSelectStatus"
        >
          <Tag
            v-if="
              slotProps.data.attendeesStatus[index].attendeesStatus ===
              EAttendeeStatus.Present
            "
            severity="success"
            value="Checked In"
          />
          <Tag
            v-else-if="
              slotProps.data.attendeesStatus[index].attendeesStatus ===
              EAttendeeStatus.Absent
            "
            severity="danger"
            value="Absent"
          />
          <Tag
            v-else-if="
              slotProps.data.attendeesStatus[index].attendeesStatus ===
              EAttendeeStatus.Late
            "
            severity="warn"
            value="Late"
          />
          <Tag
            v-else-if="
              slotProps.data.attendeesStatus[index].attendeesStatus ===
              EAttendeeStatus.Pending
            "
            severity="secondary"
            value="Not Checked In"
          />
          <Tag
            v-else-if="
              slotProps.data.attendeesStatus[index].attendeesStatus ===
              EAttendeeStatus.Not_Going
            "
            severity="danger"
            value="Not Going"
          />
          <Tag v-else severity="secondary" value="Not Checked In" />
        </CheckInOptions>
      </template>
    </Column>
    <template #empty>
      <p class="text-slate-500">No submissions</p>
    </template>
  </DataTable>
</template>
