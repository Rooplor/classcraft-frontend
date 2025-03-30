<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const op = ref();

const toggleAction = (event: MouseEvent) => {
  op.value.toggle(event);
};
</script>
<template>
  <slot name="button" :onClick="toggleAction" :disabled="!editingClassroom" />
  <Popover ref="op" :dismissable="false" style="border-radius: 1rem">
    <div class="flex flex-col gap-2 w-52">
      <div class="flex flex-col gap-2">
        <DialogSubmission v-if="editingClassroom?.published">
          <template v-slot:default="{ onClick }">
            <Button
              label="View Submissions"
              icon="pi pi-users"
              fluid
              outlined
              @click="onClick"
            />
          </template>
        </DialogSubmission>
        <ClassroomUnpublishButton v-if="editingClassroom?.published">
          <template v-slot:default="{ onClick }">
            <Button
              label="Unpublish"
              icon="pi pi-ban"
              severity="secondary"
              :disabled="!editingClassroom"
              @click="onClick"
            />
          </template>
        </ClassroomUnpublishButton>
        <ClassroomPublishButton v-else>
          <template v-slot:default="{ onClick }">
            <Button
              label="Publish"
              icon="pi pi-globe"
              outlined
              :disabled="!editingClassroom"
              @click="onClick"
            />
          </template>
        </ClassroomPublishButton>
      </div>
      <DialogDeleteClassroom>
        <template v-slot:default="{ onClick }">
          <Button
            label="Delete Classroom"
            icon="pi pi-trash"
            severity="danger"
            text
            @click="onClick"
          />
        </template>
      </DialogDeleteClassroom>
    </div>
  </Popover>
</template>
