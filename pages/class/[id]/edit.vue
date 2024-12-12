<script setup lang="ts">
import type { IClassroom } from "../../../types/Classroom";

const toast = useToast();
const confirm = useConfirm();
const router = useRouter();
const id = router.currentRoute.value.params.id;
const screenWidth = window.innerWidth;
const classroomStore = useClassroomStore();
const sidebarStore = useSidebarStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
    editingClassroom: Ref<IClassroom>;
};

const { isSidebarOpen } = storeToRefs(sidebarStore) as {
    isSidebarOpen: Ref<boolean>;
};

const {
    getClassroomById,
    toggleRegistrationStatus,
    togglePublishStatus,
    deleteClassroom,
} = useClassroom();

const op = ref();
const action = ref();
const currentUrl = window?.location?.href.replace(/\/edit$/, "");
const steps = [
    { label: "Fill class detail", value: "1" },
    { label: "Reserve venue", value: "2" },
    { label: "Prepare for registration", value: "3" },
];

const isContentDialogVisible = ref(false);

const showToast = () => {
    toast.add({
        severity: "success",
        summary: "Url is copied to clipboard",
        group: "tc",
        life: 1000,
    });
};

const toggleOp = (event: MouseEvent) => {
    op.value.toggle(event);
};

const toggleAction = (event: MouseEvent) => {
    action.value.toggle(event);
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

const onPreviewClassroom = () => {
    router.push(`/class/${editingClassroom.value.id}`);
};

const showRegistrationToast = (registrationStatus: boolean) => {
    toast.add({
        severity: registrationStatus ? "success" : "info",
        summary: registrationStatus
            ? "Classroom is open for registration"
            : "Classroom is closed for registration",
        group: "tc",
        life: 1000,
    });
};

const updateClassroomStore = (classroom: IClassroom) => {
    classroomStore.setEditingClassroom(classroom);
    classroomStore.updateClassroom(classroom);
};

const onToggleRegistrationStatus = () => {
    toggleRegistrationStatus(editingClassroom.value.id).then((res) => {
        if (res.success) {
            const { result: classroom } = res;
            if (classroom.registrationStatus && !classroom.published) {
                togglePublishStatus(editingClassroom.value.id).then((res) => {
                    if (res.success) {
                        let { result: updatedClassroom } = res;
                        updateClassroomStore(updatedClassroom);

                        showRegistrationToast(
                            editingClassroom.value.registrationStatus
                        );
                    }
                });
                return;
            }
            updateClassroomStore(classroom);
            showRegistrationToast(editingClassroom.value.registrationStatus);
        }
    });
};

const confirmDelete = () => {
    confirm.require({
        message: `Are you sure you want to delete "${editingClassroom.value.title}" classroom?`,
        header: "Delete Confirmation",
        icon: "pi pi-exclamation-triangle",
        rejectProps: {
            label: "Cancel",
        },
        acceptProps: {
            label: "Delete",
            text: true,
        },
        accept: () => {
            handleDelete();
            toast.add({
                severity: "error",
                summary: "Deleted",
                detail: `Your classroom has been deleted`,
                group: "tc",
                life: 3000,
            });
        },
    });
};

const handleDelete = async () => {
    const res = await deleteClassroom(editingClassroom.value.id);
    if (res.success) {
        classroomStore.removeClassroomById(editingClassroom.value.id);
        op.value.hide();
    }
};

classroomStore.clearEditingClassroom();

if (id) {
    try {
        classroomStore.setEditingClassroom(
            (await getClassroomById(id.toString())).result
        );
    } catch (error) {
        router.replace("/404");
    }
}

useHead({
    title: editingClassroom?.value?.title
        ? `Editing "${editingClassroom.value.title}" · Classroom · ClassCraft`
        : "Create New · Classroom · ClassCraft",
    meta: [
        {
            name: "description",
            content: "Create or edit your classroom on ClassCraft",
        },
        {
            name: "keywords",
            content: "ClassCraft, Classroom",
        },
    ],
});
</script>

<template>
    <div class="w-full pb-9">
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
                <div
                    class="h-full py-2 px-3 text-green-600 border border-green-500 bg-green-50 rounded-full"
                >
                    <i class="pi pi-star-fill" />&nbsp;14
                    <span class="hidden lg:inline">followers</span>
                </div>
                <div class="md:hidden">
                    <Button
                        :disabled="!editingClassroom"
                        label="Craft Content"
                        icon="pi pi-sparkles"
                        rounded
                        @click="isContentDialogVisible = true"
                    />
                </div>
                <Button
                    severity="secondary"
                    icon="pi pi-share-alt"
                    :disabled="!editingClassroom"
                    rounded
                    @click="toggleOp"
                />
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
                        <Button
                            v-if="editingClassroom?.registrationStatus"
                            label="Close registration"
                            icon="pi pi-lock"
                            severity="secondary"
                            :disabled="
                                !editingClassroom ||
                                !editingClassroom?.registrationUrl
                            "
                            rounded
                            @click="onToggleRegistrationStatus"
                        />
                        <Button
                            v-else
                            label="Open registration"
                            icon="pi pi-lock-open"
                            severity="contrast"
                            :disabled="
                                !editingClassroom ||
                                !editingClassroom?.registrationUrl
                            "
                            rounded
                            @click="onToggleRegistrationStatus"
                        />
                    </div>
                    <Button
                        icon="pi pi-ellipsis-v"
                        severity="secondary"
                        rounded
                        @click="toggleAction"
                    />
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <Stepper value="1" class="basis-full max-w-screen-lg m-auto">
                <div class="mb-5">
                    <StepList>
                        <Step
                            v-for="step in steps"
                            :key="step.value"
                            :value="step.value"
                            :disabled="
                                !editingClassroom ||
                                editingClassroom?.stepperStatus.toString() <
                                    step.value
                            "
                        >
                            <p
                                :class="`hidden ${
                                    screenWidth > 768 && isSidebarOpen
                                        ? 'lg:block'
                                        : 'sm:block'
                                }`"
                            >
                                {{ step.label }}
                            </p>
                        </Step>
                    </StepList>
                </div>
                <StepPanels class="!p-0 max-w-screen-lg m-auto">
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="bg-slate-50">
                            <NuxtLayout name="fill-class-detail" />
                            <div
                                @vue:mounted="
                                    activateCallback(
                                        `${
                                            editingClassroom?.stepperStatus || 1
                                        }`
                                    )
                                "
                            />
                            <div class="flex justify-end pt-6 gap-2 h-36">
                                <Button
                                    label="Reserve venue"
                                    severity="secondary"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                    @click="activateCallback('2')"
                                    :disabled="!editingClassroom"
                                    class="w-1/2"
                                />
                            </div>
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="bg-slate-50">
                            <NuxtLayout name="reserve-venue" />
                            <div class="flex justify-between pt-6 gap-2 h-36">
                                <Button
                                    label="Fill class detail"
                                    severity="secondary"
                                    icon="pi pi-arrow-left"
                                    @click="activateCallback('1')"
                                    class="w-full"
                                />
                                <Button
                                    label="Prepare for registration"
                                    severity="secondary"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                    :disabled="
                                        editingClassroom?.stepperStatus <= 2
                                    "
                                    @click="activateCallback('3')"
                                    class="w-full"
                                />
                            </div>
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <NuxtLayout name="prepare-registration" />
                        <div class="flex justify-between pt-6 gap-2 h-36">
                            <Button
                                label="Reserve venue"
                                severity="secondary"
                                icon="pi pi-arrow-left"
                                @click="activateCallback('2')"
                                class="w-full"
                            />
                            <Button
                                label="Go to the classroom"
                                severity="secondary"
                                icon="pi pi-arrow-up-right"
                                iconPos="right"
                                class="w-full"
                                @click="
                                    router.push(`/class/${editingClassroom.id}`)
                                "
                            />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
    <Dialog
        v-model:visible="isContentDialogVisible"
        header="Craft Content"
        position="top"
        :modal="true"
        :draggable="false"
        class="w-full max-w-screen-lg m-auto bgslate"
        :style="{
            height: '100vh',
            background: '#f8fafc',
            borderRadius: '1.5rem',
        }"
    >
        <NuxtLayout name="craft-content" />
    </Dialog>
    <Popover ref="op" class="p-1" style="border-radius: 1rem">
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
    <Popover ref="action" class="p-1" style="border-radius: 1rem">
        <div class="flex flex-col gap-2 w-52">
            <div class="flex flex-col gap-2 lg:hidden">
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
                <Button
                    v-if="editingClassroom?.registrationStatus"
                    label="Close registration"
                    icon="pi pi-lock"
                    severity="secondary"
                    :disabled="
                        !editingClassroom || !editingClassroom?.registrationUrl
                    "
                    rounded
                    @click="onToggleRegistrationStatus"
                />
                <Button
                    v-else
                    label="Open registration"
                    icon="pi pi-lock-open"
                    severity="contrast"
                    :disabled="
                        !editingClassroom || !editingClassroom?.registrationUrl
                    "
                    rounded
                    @click="onToggleRegistrationStatus"
                />
            </div>
            <Button
                label="Delete"
                icon="pi pi-trash"
                severity="danger"
                text
                rounded
                @click="confirmDelete"
            />
        </div>
    </Popover>
</template>
