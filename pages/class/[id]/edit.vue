<script setup lang="ts">
const toast = useToast();

const show = () => {
    toast.add({
        severity: "secondary",
        summary: "Url is copied to clipboard",
        group: "tc",
        life: 1000,
    });
    console.log("show");
};
const op = ref();

const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
};

const copyLink = () => {
    navigator.clipboard.writeText("Geeksforgeeks is best learning platform.");
    show();
};
</script>

<template>
    <Toast position="top-center" group="tc" />
    <div class="w-full p-8">
        <div class="flex justify-between mb-10">
            <h1 class="text-3xl font-bold">Class name</h1>
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
                                    value="https://primevue.org/12323ff26t2g243g423g234gg52hy25XADXAG3"
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
                            <Button label="View" icon="pi pi-eye"></Button>
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
        <div class="flex justify-center">
            <Stepper value="1" linear class="basis-full">
                <div class="mb-5">
                    <StepList>
                        <Step value="1">Fill class detail</Step>
                        <Step value="2">Reserve venue</Step>
                        <Step value="3">Craft your content</Step>
                        <Step value="4">Prepare for registration</Step>
                    </StepList>
                </div>
                <StepPanels>
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
