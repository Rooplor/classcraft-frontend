<script setup lang="ts">
import { EAttendeeStatus, type IFormSubmission } from "../../../types/Form";

const { setAttendeeStatus, getUserFormSubmissions } = useClassroomForm();
const { getUserProfile } = useUser();
const router = useRouter();
const toast = useToast();

const { id } = router.currentRoute.value.params as { id: string };
const { day } = router.currentRoute.value.query as { day: string };

const userFormSubmission = ref<IFormSubmission>();
const user = (await getUserProfile()).result;

onMounted(async () => {
  let formSubmissionResponse = await getUserFormSubmissions(
    user.id,
    id.toString()
  );

  if (formSubmissionResponse.result) {
    userFormSubmission.value = formSubmissionResponse.result;
  } else {
    toast.add({
      severity: "error",
      summary: "You have not registered for this class",
      group: "tc",
      life: 3000,
    });
    setTimeout(() => {
      router.push(`/class/${id}`);
    }, 3000);
    return;
  }

  if (!userFormSubmission.value.approvedByOwner) {
    toast.add({
      severity: "error",
      summary: "Your registration is not approved",
      group: "tc",
      life: 3000,
    });
    setTimeout(() => {
      router.push(`/class/${id}`);
    }, 3000);
    return;
  } else if (
    userFormSubmission.value.attendeesStatus === EAttendeeStatus.Present
  ) {
    toast.add({
      severity: "error",
      summary: "You have already checked in",
      group: "tc",
      life: 3000,
    });
    setTimeout(() => {
      router.push(`/class/${id}`);
    }, 3000);
    return;
  } else {
    let attendeeStatusResponse = await setAttendeeStatus(
      userFormSubmission.value?.id,
      EAttendeeStatus.Present,
      Number(day)
    );
    if (attendeeStatusResponse.success) {
      toast.add({
        severity: "success",
        summary: "You have been checked in",
        group: "tc",
        life: 3000,
      });
      setTimeout(() => {
        router.push(`/class/${id}`);
      }, 3000);
    }
  }
});
</script>
<template>Checkin you in...</template>
