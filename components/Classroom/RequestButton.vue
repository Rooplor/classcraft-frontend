<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

const props = defineProps({
  classroom: {
    type: Object as PropType<IClassroom>,
    required: true,
  },
});

const toast = useToast();

const { sendClassroomRequest, getClassroomRequestExist } =
  useRequestClassroom();

const onSendClassroomRequest = async () => {
  try {
    let res = await sendClassroomRequest(props.classroom.id);
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Request sent",
        detail: `Your request to join "${props.classroom.title}" has been sent.`,
        life: 3000,
        group: "tc",
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Request failed",
      detail: `There was an error sending your request to join "${props.classroom.title}". Please try again later.`,
      life: 3000,
      group: "tc",
    });
  }
};

const isRequested = ref(false);

const checkRequest = async () => {
  try {
    let res = await getClassroomRequestExist(props.classroom.id);
    isRequested.value = res.result;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  checkRequest();
});
</script>
<template>
  <Button
    @click="onSendClassroomRequest"
    icon="pi pi-bookmark"
    :label="`Add &quot;${classroom.title}&quot; to wishlist`"
    size="large"
    severity="secondary"
    rounded
    :disabled="isRequested"
  />
</template>
