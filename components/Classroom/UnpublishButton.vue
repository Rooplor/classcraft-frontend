<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

const classroomStore = useClassroomStore();

const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};

const toast = useToast();
const { setPublishStatus } = useClassroom();

const showUnpublishToast = () => {
  toast.add({
    severity: "info",
    summary: "Classroom is unpublished",
    group: "tc",
    life: 1000,
  });
};

const unpublish = async () => {
  try {
    let res = await setPublishStatus(editingClassroom.value.id, false);

    if (res.success) {
      classroomStore.setEditingClassroom(res.result);
      classroomStore.updateClassroom(res.result);

      showUnpublishToast();
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Could not unpublish classroom",
      detail:
        "There was an error unpublishing the classroom. Please try again later.",
      life: 3000,
      group: "tc",
    });
  }
};
</script>
<template>
  <slot name="button" :onClick="unpublish" />
</template>
