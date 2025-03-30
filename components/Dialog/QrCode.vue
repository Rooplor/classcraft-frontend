<script setup lang="ts">
import { type IClassroom } from "../../types/Classroom";

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const isVisible = ref(false);

const open = () => {
  isVisible.value = true;
};

const isCheckInEnable = computed(() => {
  const { dates } = editingClassroom.value;
  const startDateTime = isoToDateWithTimezone(dates[0].date.startDateTime).getTime();
  const endDateTime = isoToDateWithTimezone(dates[dates.length - 1].date.endDateTime).getTime();
  const currentTime = Date.now();

  return startDateTime - currentTime < 30 * 60 * 1000 && currentTime < endDateTime;
});
</script>
<template>
  <slot
    name="button"
    :onClick="open"
    :disabled="!editingClassroom || !isCheckInEnable"
  />
  <Dialog
    v-model:visible="isVisible"
    dismissableMask
    :header="`Check-In QR Code for &quot;${editingClassroom?.title}&quot;`"
    :style="{ width: '48rem' }"
    modal
    :draggable="false"
  >
    <div class="flex flex-col items-center gap-4">
      <QRCode :classroom-id="editingClassroom.id" class="w-full" />
    </div>
  </Dialog>
</template>
