<script setup lang="ts">
const toast = useToast();
const router = useRouter();
const id = router.currentRoute.value.params.id;
const classroomStore = useClassroomStore();
const { getClassroomById } = useClassroom();
const { editingClassroom } = storeToRefs(classroomStore);
const op = ref();
const currentUrl = window?.location?.href.replace(/\/edit$/, "");

const showToast = () => {
    toast.add({
        severity: "secondary",
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

const steps = [
    { label: "Fill class detail", value: "1" },
    { label: "Reserve venue", value: "2" },
    { label: "Craft your content", value: "3" },
    { label: "Prepare for registration", value: "4" },
];

try {
    classroomStore.setEditingClassroom(await getClassroomById(id.toString()));
} catch (error) {
    router.replace("/404");
}
</script>

<template>
    <div class="w-full py-9 px-[10px]">
        <div class="flex justify-between mb-10">
            <h1 class="text-3xl font-bold">
                {{ editingClassroom?.title || "New class" }}
            </h1>
            <div class="flex items-center gap-2">
                <div
                    class="h-full p-2 px-3 text-green-700 bg-green-200 rounded-md"
                >
                    <i class="pi pi-star-fill" />&nbsp;14 People interested
                </div>
                <Button label="Share" icon="pi pi-share-alt" @click="toggle" />
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
                            <Button label="Publish" icon="pi pi-globe"></Button>
                            <Button
                                label="View"
                                severity="secondary"
                                icon="pi pi-eye"
                            ></Button>
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
        <div class="flex justify-center">
            <Stepper value="1" linear class="basis-full">
                <div class="mb-5">
                    <StepList>
                        <Step
                            v-for="step in steps"
                            :key="step.value"
                            :value="step.value"
                        >
                            {{ step.label }}
                        </Step>
                    </StepList>
                </div>
                <StepPanels class="!p-0">
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <div class="bg-gray-50">
                            <NuxtLayout name="fill-class-detail" />
                            <div class="flex justify-end pt-6">
                                <Button
                                    label="Next"
                                    severity="contrast"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                    @click="activateCallback('2')"
                                />
                            </div>
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <div class="bg-gray-50">
                            <NuxtLayout name="reserve-venue" />
                            <div class="flex justify-between pt-6">
                                <Button
                                    label="Back"
                                    severity="secondary"
                                    icon="pi pi-arrow-left"
                                    @click="activateCallback('1')"
                                />
                                <Button
                                    label="Next"
                                    severity="contrast"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                    @click="activateCallback('3')"
                                />
                            </div>
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <div class="bg-gray-50">
                            <NuxtLayout name="craft-content" />
                            <div class="flex justify-between pt-6">
                                <Button
                                    label="Back"
                                    severity="secondary"
                                    icon="pi pi-arrow-left"
                                    @click="activateCallback('2')"
                                />
                                <Button
                                    label="Next"
                                    severity="contrast"
                                    icon="pi pi-arrow-right"
                                    iconPos="right"
                                    @click="activateCallback('4')"
                                />
                            </div>
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="4">
                        <div class="bg-gray-50">
                            <NuxtLayout name="prepare-registration" />
                            <div class="pt-6">
                                <Button
                                    label="Back"
                                    severity="secondary"
                                    icon="pi pi-arrow-left"
                                    @click="activateCallback('3')"
                                />
                            </div>
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
</template>
