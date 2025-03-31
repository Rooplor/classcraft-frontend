<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";
import { EFileType } from "../types/File";

const { uploadFile: uploadFileApi, removeFile: removeFileApi } =
  useFileUpload();
const toast = useToast();
const { updateClassMaterial: updateClassMaterialApi } = useClassroom();

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom | null>;
};

const onFileSelect = async (e: any) => {
  if (e.files.length === 0 || !editingClassroom.value) return;

  const formData = new FormData();
  e.files.forEach((file: any) => {
    formData.append("file", file);
    formData.append("fileCategory", EFileType.CLASS_MATERIAL);
  });

  uploadFile(formData);
};

const uploadFile = async (file: FormData) => {
  try {
    const res = await uploadFileApi(file);
    if (res.success) {
      updateClassMaterial(res.result);
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Could not upload file",
      detail: "There was an error uploading the file. Please try again later.",
      group: "tc",
      life: 3000,
    });
  }
};

const updateClassMaterial = async (uploadingFiles: { urls: string[] }) => {
  if (!editingClassroom.value) return;

  try {
    let res = await updateClassMaterialApi(editingClassroom.value.id, [
      ...editingClassroom.value.classMaterials,
      ...uploadingFiles.urls,
    ]);

    if (res.success) {
      classroomStore.setEditingClassroom(res.result);
      toast.add({
        severity: "success",
        summary: "Uploaded",
        detail: `Class materials has been uploaded`,
        group: "tc",
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Could not upload file",
      detail: "There was an error uploading the file. Please try again later.",
      group: "tc",
      life: 3000,
    });
  }
};

const removeFile = async (e: Event, file: string, index: number) => {
  e.preventDefault();
  if (!editingClassroom.value) return;

  let files = editingClassroom.value.classMaterials;
  files.splice(index, 1);
  try {
    let res = await updateClassMaterialApi(editingClassroom.value.id, files);

    if (res.success) {
      classroomStore.setEditingClassroom(res.result);
      removeFileApi(file);
      toast.add({
        severity: "error",
        summary: "Deleted",
        detail: `Class material has been removed`,
        group: "tc",
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Could not delete file",
      detail: "There was an error deleting the file. Please try again later.",
      group: "tc",
      life: 3000,
    });
  }
};
</script>
<template>
  <div>
    <FileUpload
      @select="onFileSelect($event)"
      :multiple="true"
      accept="application/pdf"
      :maxFileSize="25000000"
      :pt="{ root: `rounded-xl` }"
    >
      <template #header="{ chooseCallback, clearCallback }">
        <div class="flex justify-between items-center">
          <Button
            label="Upload"
            icon="pi pi-upload"
            @click="
              () => {
                chooseCallback();
                clearCallback();
              }
            "
          />
        </div>
      </template>
      <template #content="{ messages }">
        <div class="grid grid-cols-1 gap-2">
          <Message v-for="message of messages" :key="message" severity="error">
            {{ message }}
          </Message>
          <ClassMaterialItem
            v-for="(file, index) in editingClassroom?.classMaterials"
            :key="index"
            :file="file"
            :index="index"
            removable
            @remove="removeFile"
          />
        </div>
        <div
          v-if="editingClassroom?.classMaterials.length === 0"
          class="flex justify-center items-center h-32"
        >
          <p class="text-slate-400">No class materials uploaded.</p>
        </div>
      </template>
    </FileUpload>
  </div>
</template>
