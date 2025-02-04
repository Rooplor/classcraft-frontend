<script setup lang="ts">
import type { IClassroom } from "../../../types/Classroom";

const router = useRouter();
const id = router.currentRoute.value.params.id;
const screenWidth = window.innerWidth;
const classroomStore = useClassroomStore();
const sidebarStore = useSidebarStore();
const { getUserProfile } = useUser();
const userProfile = (await getUserProfile()).result;
const { editingClassroom } = storeToRefs(classroomStore) as {
    editingClassroom: Ref<IClassroom>;
};

const { isSidebarOpen } = storeToRefs(sidebarStore) as {
    isSidebarOpen: Ref<boolean>;
};

const { getClassroomById } = useClassroom();

const steps = [
    { label: "Fill class detail", value: "1" },
    { label: "Reserve venue", value: "2" },
    { label: "Prepare for registration", value: "3" },
];

classroomStore.clearEditingClassroom();

if (id) {
    try {
        let res = await getClassroomById(id.toString())
        if (res.result.owner !== userProfile.id) {
            router.replace("/404");
        }

        classroomStore.setEditingClassroom(res.result);
    } catch (error) {
        router.replace("/404");
    }
}

useHead({
    title: editingClassroom?.value?.title
        ? `Editing "${editingClassroom.value.title}" · ClassCraft`
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
        <EditClassroomHeaderbar />
        <div class="flex justify-center">
            <Stepper value="1" class="basis-full max-w-screen-lg m-auto">
                <div v-if="editingClassroom" class="inline-flex items-center gap-2 px-4 text-3xl mb-10 text-slate-500 font-bold">
                    <i class="pi pi-pencil" style="
                        font-size: 1.5rem;
                    " />
                    <p>Editing "{{ editingClassroom.title }}"</p>
                </div>
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
                        <div class="bg-slate-50">
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
                        </div>
                    </StepPanel>
                </StepPanels>
            </Stepper>
        </div>
    </div>
</template>
