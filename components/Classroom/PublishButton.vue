<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

const classroomStore = useClassroomStore();

const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};

const toast = useToast();
const { setPublishStatus } = useClassroom();

const showPublishToast = () => {
  toast.add({
    severity: "success",
    summary: "Classroom is published",
    group: "tc",
    life: 1000,
  });
};

const publish = async () => {
  try {
    let res = await setPublishStatus(editingClassroom.value.id, true);

    if (res.success) {
      classroomStore.setEditingClassroom(res.result);
      classroomStore.updateClassroom(res.result);

      showPublishToast();
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Could not publish classroom",
      detail:
        "There was an error publishing the classroom. Please try again later.",
      life: 3000,
      group: "tc",
    });
  }
};
</script>
<template>
  <slot name="button" :onClick="publish" :disabled="!editingClassroom" />
</template>
