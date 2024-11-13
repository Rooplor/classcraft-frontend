<script setup lang="ts">
import type { IClassroom } from "../../../types/Classroom";

const toast = useToast();
const router = useRouter();
const id = router.currentRoute.value.params.id;
const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore);
const { getClassroomById, toggleRegistrationStatus, togglePublishStatus } =
    useClassroom();
const op = ref();
const currentUrl = window?.location?.href.replace(/\/edit$/, "");
const steps = [
    { label: "Fill class detail", value: "1" },
    { label: "Reserve venue", value: "2" },
    { label: "Craft your content", value: "3" },
    { label: "Prepare for registration", value: "4" },
];

const showToast = () => {
    toast.add({
        severity: "success",
        summary: "Url is copied to clipboard",
        group: "tc",
        life: 1000,
    });
};

const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
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
        const { result: classroom } = res;
        if (classroom.registrationStatus && !classroom.published) {
            togglePublishStatus(editingClassroom.value.id).then((res) => {
                const { result: updatedClassroom } = res;
                updateClassroomStore(updatedClassroom);
                if (res.success) {
                    showRegistrationToast(
                        editingClassroom.value.registrationStatus
                    );
                }
            });
            return;
        }
        updateClassroomStore(classroom);
        if (res.success) {
            showRegistrationToast(editingClassroom.value.registrationStatus);
        }
    });
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
</script>

<template>
    <div class="w-full py-9 px-[10px]">
        <div class="flex justify-end mb-10">
            <div class="flex w-full justify-end items-center gap-2">
                <Button
                    label="Share"
                    :severity="
                        editingClassroom?.published ? 'secondary' : 'primary'
                    "
                    icon="pi pi-share-alt"
                    :disabled="!editingClassroom"
                    @click="toggle"
                />
                <Popover ref="op">
                    <div class="flex flex-col gap-4 w-[25rem]">
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
                                ></InputText>
                                <Button
                                    icon="pi pi-copy"
                                    severity="secondary"
                                    @click="copyLink"
                                />
                            </InputGroup>
                        </div>
                        <div class="flex justify-end gap-2">
                            <Button
                                :label="
                                    editingClassroom?.published
                                        ? 'Unpublish'
                                        : 'Publish'
                                "
                                :icon="
                                    editingClassroom?.published
                                        ? 'pi pi-lock-open'
                                        : 'pi pi-lock'
                                "
                                :severity="
                                    editingClassroom?.published
                                        ? 'secondary'
                                        : 'primary'
                                "
                                @click="onPublish"
                            />

                            <Button
                                label="Preview"
                                :severity="
                                    editingClassroom?.published
                                        ? 'primary'
                                        : 'secondary'
                                "
                                icon="pi pi-eye"
                                @click="onPreviewClassroom"
                            />
                        </div>
                    </div>
                </Popover>
                <Button
                    :label="
                        editingClassroom?.registrationStatus
                            ? 'Close registration'
                            : 'Open registration'
                    "
                    :icon="
                        editingClassroom?.registrationStatus
                            ? 'pi pi-lock'
                            : 'pi pi-lock-open'
                    "
                    :severity="
                        editingClassroom?.registrationStatus
                            ? 'secondary'
                            : 'contrast'
                    "
                    :disabled="
                        !editingClassroom || editingClassroom?.stepperStatus < 4
                    "
                    @click="onToggleRegistrationStatus"
                />
            </div>
        </div>
        <div class="flex justify-center">
            <Stepper value="1" class="basis-full">
                <div class="mb-5">
                    <StepList>
                        <Step
                            v-for="step in steps"
                            :key="step.value"
                            :value="step.value"
                            :disabled="
                                !editingClassroom ||
                                editingClassroom?.stepperStatus < step.value
                            "
                        >
                            {{ step.label }}
                        </Step>
                    </StepList>
                </div>
                <StepPanels class="!p-0">
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="bg-gray-50">
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
                        <div class="bg-gray-50">
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
                                    label="Craft your content"
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
                        <div class="bg-gray-50">
                            <NuxtLayout name="craft-content" />
                            <div class="flex justify-between pt-6 gap-2 h-36">
                                <Button
                                    label="Reserve venue"
                                    severity="secondary"
                                    icon="pi pi-arrow-left"
                                    @click="activateCallback('2')"
                                    class="w-full"
                                />
                                <Button
                                    label="Prepare for registration"
                                    severity="secondary"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                    :disabled="
                                        editingClassroom?.stepperStatus <= 3
                                    "
                                    @click="activateCallback('4')"
                                    class="w-full"
                                />
                            </div>
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="4">
                        <NuxtLayout name="prepare-registration" />
                        <div class="flex justify-between pt-6 gap-2 h-36">
                            <Button
                                label="Reserve venue"
                                severity="secondary"
                                icon="pi pi-arrow-left"
                                @click="activateCallback('3')"
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
</template>
