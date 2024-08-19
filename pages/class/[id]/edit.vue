<script setup lang="ts">
const op = ref();

const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
};
</script>

<template>
    <div class="w-full">
        <div class="flex justify-between">
            <h1>Class name</h1>
            <div class="flex items-center">
                <div class="p-2 bg-green-300 rounded-md">
                    14 People interested
                </div>
                <Button label="Share" icon="pi pi-share-alt" @click="toggle" />
                <Popover ref="op">
                    <div class="flex flex-col gap-4 w-[25rem]">
                        <div>
                            <span class="font-medium block mb-2"
                                >Let the world know about this class</span
                            >
                            <InputGroup>
                                <InputText
                                    value="https://primevue.org/12323ff26t2g243g423g234gg52hy25XADXAG3"
                                    readonly
                                    class="w-[25rem]"
                                ></InputText>
                                <Button icon="pi pi-copy" severity="secondary" />
                            </InputGroup>
                        </div>
                        <div class="flex gap-2 justify-end">
                            <Button label="Publish" icon="pi pi-globe"></Button>
                            <Button label="View" icon="pi pi-eye"></Button>
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
        <div class="card flex justify-center">
            <Stepper value="1" linear class="basis-full">
                <StepList>
                    <Step value="1">Fill class detail</Step>
                    <Step value="2">Reserve venue</Step>
                    <Step value="3">Craft your content</Step>
                    <Step value="4">Prepare for registration</Step>
                </StepList>
                <StepPanels>
                    <StepPanel v-slot="{ activateCallback }" value="1">
                        <NuxtLayout name="fill-class-detail" />
                        <div class="flex pt-6 justify-end">
                            <Button
                                label="Next"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                @click="activateCallback('2')"
                            />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="2">
                        <NuxtLayout name="reserve-venue" />

                        <div class="flex pt-6 justify-between">
                            <Button
                                label="Back"
                                severity="secondary"
                                icon="pi pi-arrow-left"
                                @click="activateCallback('1')"
                            />
                            <Button
                                label="Next"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                @click="activateCallback('3')"
                            />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="3">
                        <NuxtLayout name="craft-content" />

                        <div class="flex pt-6 justify-between">
                            <Button
                                label="Back"
                                severity="secondary"
                                icon="pi pi-arrow-left"
                                @click="activateCallback('2')"
                            />
                            <Button
                                label="Next"
                                icon="pi pi-arrow-right"
                                iconPos="right"
                                @click="activateCallback('4')"
                            />
                        </div>
                    </StepPanel>
                    <StepPanel v-slot="{ activateCallback }" value="4">
                        <NuxtLayout name="prepare-registration" />

                        <div class="pt-6">
                            <Button
                                label="Back"
                                severity="secondary"
                                icon="pi pi-arrow-left"
                                @click="activateCallback('3')"
                            />
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
</template>
