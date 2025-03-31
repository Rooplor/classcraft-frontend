<script setup lang="ts">
import { type IClassroom } from "../../types/Classroom";

const classroomStore = useClassroomStore();

const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};

const home = ref({
  icon: "pi pi-home",
  label: "Home",
  url: "/class",
});
const items = ref([
  { label: "Hosted Classrooms" },
  {
    label: `${
      editingClassroom.value
        ? editingClassroom.value.title
        : "Create a Classroom"
    }`,
  },
]);
</script>
<template>
  <div
    class="w-full mb-16 pt-1 pb-8 md:px-2 bg-gradient-to-b from-60% from-slate-50 to-slate-50/0 sticky top-0 flex justify-between items-center gap-2 z-10"
  >
    <DrawerButton />
    <Breadcrumb
      :home="home"
      :model="items"
      class="!bg-transparent !p-0 !text-slate-500 !text-sm hidden lg:block"
    >
      <template #item="{ item }">
        <a class="cursor-pointer" :href="item.url && item.url">
          <span>{{ item.label }}</span>
        </a>
      </template>
      <template #separator> / </template>
    </Breadcrumb>
    <div />
    <div class="inline-flex items-center justify-center gap-2">
      <DialogQrCode>
        <template v-slot:button="{ onClick, disabled }">
          <Button
            icon="pi pi-qrcode"
            rounded
            size="small"
            :disabled="disabled"
            @click="onClick"
          />
        </template>
      </DialogQrCode>
      <DialogCheckIn>
        <template v-slot:button="{ onClick, disabled }">
          <Button
            icon="pi pi-check"
            label="Check-In"
            rounded
            size="small"
            :disabled="disabled"
            @click="onClick"
          />
        </template>
      </DialogCheckIn>
      <DialogClassroomContent>
        <template v-slot:button="{ onClick, disabled }">
          <Button
            label="Class Content"
            icon="pi pi-sparkles"
            rounded
            size="small"
            :disabled="disabled"
            @click="onClick"
          />
        </template>
      </DialogClassroomContent>
      <DialogClassroomFeedback>
        <template v-slot:button="{ onClick, disabled }">
          <Button
            label="Feedback"
            icon="pi pi-heart"
            rounded
            outlined
            size="small"
            :disabled="disabled"
            @click="onClick"
          />
        </template>
      </DialogClassroomFeedback>
      <div class="hidden gap-2 lg:flex">
        <DialogSubmission v-if="editingClassroom?.published">
          <template v-slot:button="{ onClick }">
            <Button
              label="View Submissions"
              icon="pi pi-users"
              rounded
              outlined
              size="small"
              @click="onClick"
            />
          </template>
        </DialogSubmission>
        <ClassroomPublishButton v-else>
          <template v-slot:button="{ onClick, disabled }">
            <Button
              label="Publish"
              icon="pi pi-globe"
              rounded
              size="small"
              :disabled="disabled"
              @click="onClick"
            />
          </template>
        </ClassroomPublishButton>
      </div>
      <PopoverClassroomPublish>
        <template v-slot:button="{ onClick, disabled }">
          <Button
            severity="secondary"
            icon="pi pi-share-alt"
            rounded
            text
            size="small"
            :disabled="disabled"
            @click="onClick"
          />
        </template>
      </PopoverClassroomPublish>
      <PopoverClassroomAction>
        <template v-slot:button="{ onClick, disabled }">
          <Button
            icon="pi pi-ellipsis-v"
            severity="secondary"
            rounded
            text
            size="small"
            :disabled="disabled"
            @click="onClick"
          />
        </template>
      </PopoverClassroomAction>
    </div>
  </div>
</template>
