<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

const props = defineProps({
  classroom: {
    type: Object as PropType<IClassroom>,
    required: true,
  },
});

const toast = useToast();
const {
  sendClassroomRequest,
  deleteClassroomRequest,
  getClassroomRequestExist,
} = useRequestClassroom();

const isRequested = ref(false);

const onSendClassroomRequest = async () => {
  try {
    let res = await sendClassroomRequest(props.classroom.id);
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Added to your wishlist",
        detail: `Successfully adding "${props.classroom.title}" to your wishlist.`,
        life: 3000,
        group: "tc",
      });
      isRequested.value = true;
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Request failed",
      detail: `There was an error adding "${props.classroom.title}" to your wishlist. Please try again later.`,
      life: 3000,
      group: "tc",
    });
  }
};

const onDeleteClassroomRequest = async () => {
  try {
    let res = await deleteClassroomRequest(props.classroom.id);
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Removed from your wishlist",
        detail: `Successfully removing "${props.classroom.title}" from your wishlist.`,
        life: 3000,
        group: "tc",
      });
      isRequested.value = false;
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Request failed",
      detail: `There was an error removing "${props.classroom.title}" from your wishlist. Please try again later.`,
      life: 3000,
      group: "tc",
    });
  }
};

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
    v-if="isRequested"
    @click="onDeleteClassroomRequest"
    icon="pi pi-bookmark-fill"
    label="Remove from wishlist"
    size="large"
    severity="secondary"
    rounded
  />
  <Button
    v-else
    @click="onSendClassroomRequest"
    icon="pi pi-bookmark"
    label="Add to wishlist"
    size="large"
    severity="secondary"
    rounded
  />
</template>
