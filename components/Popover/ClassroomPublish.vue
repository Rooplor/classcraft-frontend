<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const op = ref();
const toast = useToast();
const router = useRouter();

const currentUrl = window?.location?.href.replace(/\/edit$/, "");

const toggleAction = (event: MouseEvent) => {
  op.value.toggle(event);
};

const previewClassroom = () => {
  router.push(`/class/${editingClassroom.value.id}`);
};

const copyLink = () => {
  navigator.clipboard.writeText(currentUrl);
  showToast();
};

const showToast = () => {
  toast.add({
    severity: "success",
    summary: "Url is copied to clipboard",
    group: "tc",
    life: 1000,
  });
};
</script>
<template>
  <slot name="button" :onClick="toggleAction" :disabled="!editingClassroom" />
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
            @click="previewClassroom"
          />
        </div>
      </div>
    </div>
  </Popover>
</template>
