<script setup lang="ts">
import { type IClassroom } from "../../types/Classroom";

const toast = useToast();
const router = useRouter();
const classroomStore = useClassroomStore();
const { setPublishStatus, deleteClassroom } = useClassroom();

const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};

const op = ref();
const action = ref();
const isContentDialogVisible = ref(false);
const isQrDialogVisible = ref(false);
const isCheckinDialogVisible = ref(false);

const deleteInput = ref("");
const isMatch = ref(true);

const currentUrl = window?.location?.href.replace(/\/edit$/, "");

const toggleOp = (event: MouseEvent) => {
  op.value.toggle(event);
};

const toggleAction = (event: MouseEvent) => {
  action.value.toggle(event);
};

const onPreviewClassroom = () => {
  router.push(`/class/${editingClassroom.value.id}`);
};

const showToast = () => {
  toast.add({
    severity: "success",
    summary: "Url is copied to clipboard",
    group: "tc",
    life: 1000,
  });
};

const copyLink = () => {
  navigator.clipboard.writeText(currentUrl);
  showToast();
};

const onPublish = async () => {
  let res = await setPublishStatus(editingClassroom.value.id, true);

  if (res.success) {
    classroomStore.setEditingClassroom(res.result);
    classroomStore.updateClassroom(res.result);

    toast.add({
      severity: "success",
      summary: "Classroom is published",
      group: "tc",
      life: 1000,
    });
  }
};

const onUnpublish = async () => {
  let res = await setPublishStatus(editingClassroom.value.id, false);

  if (res.success) {
    classroomStore.setEditingClassroom(res.result);
    classroomStore.updateClassroom(res.result);

    toast.add({
      severity: "info",
      summary: "Classroom is unpublished",
      group: "tc",
      life: 1000,
    });
  }
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

const handleDelete = async () => {
  if (deleteInput.value !== editingClassroom.value.title) {
    isMatch.value = false;
    return;
  }
  const res = await deleteClassroom(editingClassroom.value.id);
  if (res.success) {
    classroomStore.removeClassroomById(editingClassroom.value.id);
    router.push("/class");
  }
};

const isDeleteDialogOpen = ref(false);
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
      <Button
        icon="pi pi-qrcode"
        rounded
        size="small"
        :disabled="!editingClassroom"
        @click="isQrDialogVisible = true"
      />
      <Button
        icon="pi pi-check"
        label="Check-In"
        rounded
        size="small"
        :disabled="!editingClassroom"
        @click="isCheckinDialogVisible = true"
      />
      <Button
        :disabled="!editingClassroom"
        label="Craft Content"
        icon="pi pi-sparkles"
        rounded
        size="small"
        @click="isContentDialogVisible = true"
      />
      <div class="hidden gap-2 lg:flex">
        <ViewSubmissionButton v-if="editingClassroom?.published">
          <Button
            label="View Submissions"
            icon="pi pi-users"
            rounded
            outlined
            size="small"
          />
        </ViewSubmissionButton>
        <Button
          v-else
          label="Publish"
          icon="pi pi-globe"
          outlined
          :disabled="!editingClassroom"
          rounded
          text
          size="small"
          @click="onPublish"
        />
      </div>
      <Button
        severity="secondary"
        icon="pi pi-share-alt"
        :disabled="!editingClassroom"
        rounded
        text
        size="small"
        @click="toggleOp"
      />
      <Button
        icon="pi pi-ellipsis-v"
        severity="secondary"
        rounded
        text
        size="small"
        :disabled="!editingClassroom"
        @click="toggleAction"
      />
    </div>
  </div>
  <Popover ref="op" style="border-radius: 1rem">
    <div class="flex flex-col gap-4 w-[25rem]">
      <Message v-if="!editingClassroom?.published" severity="warn">
        Publish this classroom first to share the link
      </Message>
      <div>
        <span class="block mb-2 font-medium"
          >Let the world know about this class</span
        >
        <InputGroup>
          <InputText :value="currentUrl" readonly disabled class="w-[25rem]" />
          <Button icon="pi pi-copy" severity="secondary" @click="copyLink" />
        </InputGroup>
        <div class="flex justify-end mt-2">
          <Button
            label="Preview"
            :severity="editingClassroom?.published ? 'primary' : 'secondary'"
            icon="pi pi-eye"
            rounded
            @click="onPreviewClassroom"
          />
        </div>
      </div>
    </div>
  </Popover>
  <Popover ref="action" style="border-radius: 1rem">
    <div class="flex flex-col gap-2 w-52">
      <div class="flex flex-col gap-2">
        <ViewSubmissionButton v-if="editingClassroom?.published">
          <Button label="View Submissions" icon="pi pi-users" fluid outlined />
        </ViewSubmissionButton>
        <Button
          v-if="editingClassroom?.published"
          label="Unpublish"
          icon="pi pi-ban"
          severity="secondary"
          :disabled="!editingClassroom"
          @click="onUnpublish"
        />
        <Button
          v-else
          label="Publish"
          icon="pi pi-globe"
          outlined
          :disabled="!editingClassroom"
          @click="onPublish"
        />
      </div>
      <Button
        label="Delete Classroom"
        icon="pi pi-trash"
        severity="danger"
        text
        @click="isDeleteDialogOpen = true"
      />
    </div>
  </Popover>
  <Dialog
    v-model:visible="isContentDialogVisible"
    dismissableMask
    header="Craft Content"
    position="top"
    :modal="true"
    :draggable="false"
    class="w-full max-w-screen-lg m-auto"
    :style="{
      height: '100vh',
      background: '#f8fafc',
      borderRadius: '1.5rem',
    }"
  >
    <NuxtLayout name="craft-content" />
  </Dialog>
  <Dialog
    v-model:visible="isDeleteDialogOpen"
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
  <Dialog
    v-model:visible="isCheckinDialogVisible"
    dismissableMask
    header="Check-In Status"
    position="center"
    :modal="true"
    :draggable="false"
    class="w-full mx-3 m-auto"
    :style="{
      height: '100vh',
      background: '#f8fafc',
    }"
  >
    <NuxtLayout name="check-in" />
  </Dialog>
  <Dialog
    v-model:visible="isQrDialogVisible"
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
