<script setup lang="ts">
import  {EStepperStatus, type IClassroom } from "../../types/Classroom";

const toast = useToast();
const router = useRouter();
const classroomStore = useClassroomStore();
const { togglePublishStatus, deleteClassroom } =
    useClassroom();

const { editingClassroom } = storeToRefs(classroomStore) as {
    editingClassroom: Ref<IClassroom>;
};

const op = ref();
const action = ref();
const isContentDialogVisible = ref(false);

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
    togglePublishStatus(editingClassroom.value.id).then((res) => {
        if (res.success) {
            classroomStore.setEditingClassroom(res.result);
            classroomStore.updateClassroom(res.result);
            if (editingClassroom.value.published) {
                toast.add({
                    severity: "success",
                    summary: "Classroom is published",
                    group: "tc",
                    life: 1000,
                });
            } else {
                toast.add({
                    severity: "info",
                    summary: "Classroom is unpublished",
                    group: "tc",
                    life: 1000,
                });
            }
        }
    });
};



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
        class="w-full p-2 mb-16 sticky top-2 flex justify-between items-center gap-2 bg-white border rounded-full z-10"
    >
        <DrawerButton />
        <div class="hidden md:flex gap-2">
            <Button
                :disabled="!editingClassroom"
                label="Craft Content"
                icon="pi pi-sparkles"
                rounded
                @click="isContentDialogVisible = true"
            />
        </div>

        <div class="flex gap-2">
            <div class="md:hidden">
                <Button
                    :disabled="!editingClassroom"
                    label="Craft Content"
                    icon="pi pi-sparkles"
                    rounded
                    @click="isContentDialogVisible = true"
                />
            </div>
            <div class="flex gap-2">
                <div class="hidden gap-2 lg:flex">
                        <Button
                            v-if="editingClassroom?.published"
                            label="Unpublish"
                            icon="pi pi-ban"
                            severity="secondary"
                            :disabled="!editingClassroom"
                            rounded
                            @click="onPublish"
                        />
                        <Button
                            v-else
                            label="Publish"
                            icon="pi pi-globe"
                            severity="primary"
                            :disabled="!editingClassroom"
                            rounded
                            @click="onPublish"
                        />
                </div>
                <Button
                    severity="secondary"
                    icon="pi pi-share-alt"
                    :disabled="!editingClassroom"
                    rounded
                    @click="toggleOp"
                />
                <Button
                    icon="pi pi-ellipsis-v"
                    severity="secondary"
                    rounded
                    :disabled="!editingClassroom"
                    @click="toggleAction"
                />
            </div>
        </div>
    </div>
    <Popover  ref="op" style="border-radius: 1rem">
        <div class="flex flex-col gap-4 w-[25rem]">
            <Message v-if="!editingClassroom?.published" severity="warn">
                Publish this classroom first to share the link
            </Message>
            <div>
                <span class="block mb-2 font-medium"
                    >Let the world know about this class</span
                >
                <InputGroup>
                    <InputText
                        :value="currentUrl"
                        readonly
                        disabled
                        class="w-[25rem]"
                    />
                    <Button
                        icon="pi pi-copy"
                        severity="secondary"
                        @click="copyLink"
                    />
                </InputGroup>
                <div class="flex justify-end mt-2">
                    <Button
                        label="Preview"
                        :severity="
                            editingClassroom?.published
                                ? 'primary'
                                : 'secondary'
                        "
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
                <Button
                    v-if="editingClassroom?.published"
                    label="Unpublish"
                    icon="pi pi-ban"
                    severity="secondary"
                    :disabled="!editingClassroom"
                    @click="onPublish"
                />
                <Button
                    v-else
                    label="Publish"
                    icon="pi pi-globe"
                    severity="primary"
                    :disabled="!editingClassroom"
                    @click="onPublish"
                />
                <div v-if="editingClassroom?.published">
                </div>
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
                <span class="font-semibold">
                    "{{ editingClassroom?.title }}"
                </span>
                to delete</label
            >
            <!-- Type text to match classroom title to delete, if not match, show error message -->
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
