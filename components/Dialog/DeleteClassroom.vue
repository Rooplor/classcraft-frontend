<script setup lang="ts">
import { type IClassroom } from "../../types/Classroom";

const { deleteClassroom } = useClassroom();
const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};

const router = useRouter();

const isVisible = ref(false);
const isMatch = computed(() => {
  return deleteInput.value === editingClassroom.value.title;
});
const deleteInput = ref("");

const open = () => {
  isVisible.value = true;
};

const handleDelete = async () => {
  if (!isMatch) return;

  const res = await deleteClassroom(editingClassroom.value.id);
  if (res.success) {
    classroomStore.removeClassroomById(editingClassroom.value.id);
    router.push("/class");
  }
};
</script>
<template>
  <slot name="button" :onClick="open" />
  <Dialog
    v-model:visible="isVisible"
    :header="`Delete ${editingClassroom?.title}`"
    :style="{ width: '32rem' }"
    modal
    :draggable="false"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-2">
      You can NOT undo this action
    </span>
    <div class="flex flex-col gap-4 mb-4">
      <label for="username">
        Type
        <span class="font-semibold"> "{{ editingClassroom?.title }}" </span>
        to delete</label
      >
      <InputText
        id="classroom-title"
        class="flex-auto"
        autocomplete="off"
        v-model="deleteInput"
        @keyup.enter="handleDelete"
      />
      <span v-if="!isMatch" class="text-red-500">
        Please type text to match classroom title to delete
      </span>
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Delete"
        severity="danger"
        fluid
        text
        @click="handleDelete"
      />
    </div>
  </Dialog>
</template>
