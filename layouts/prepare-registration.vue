<script setup lang="ts">
interface Question {
    id: number;
    question: string;
}
const questions: Ref<Question[]> = ref([]);
const editingQuestion = ref<Question | null>(null);
const confirm = useConfirm();
const toast = useToast();
const { toggleRegistrationStatus } = useClassroom();
const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore);

const onSubmit = (e: Event) => {
    e.preventDefault();
};
const onSaveQuestion = (question: Question) => {
    const index = questions.value.findIndex((q) => q.id === question.id);
    questions.value[index] = question;
    editingQuestion.value = null;
};
const addQuestion = () => {
    let newQuestion: Question = {
        id: questions.value.length + 1,
        question: "",
    };
    questions.value.push(newQuestion);
    editingQuestion.value = newQuestion;
};
const removeQuestion = (id: number) => {
    questions.value = questions.value.filter((question) => question.id !== id);
};

const onToggleRegistrationStatus = () => {
    toggleRegistrationStatus(editingClassroom.value.id).then((res) => {
        if (res.success) {
            classroomStore.setEditingClassroom(res.result);
            if (editingClassroom.value.registrationStatus) {
                toast.add({
                    severity: "success",
                    summary: "Classroom is open for registration",
                    group: "tc",
                    life: 1000,
                });
            } else {
                toast.add({
                    severity: "info",
                    summary: "Classroom is closed for registration",
                    group: "tc",
                    life: 1000,
                });
            }
        }
    });
};

const confirmDelete = (question: Question) => {
    confirm.require({
        message: `Are you sure you want to delete this question: ${question.question}?`,
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
            removeQuestion(question.id);
            toast.add({
                severity: "error",
                summary: "Deleted",
                detail: `Your question has been deleted`,
                group: "tc",
                life: 3000,
            });
        },
    });
};
</script>

<template>
    <div>
        <form
            @submit="onSubmit"
            class="p-6 bg-white border rounded-3xl space-y-4"
        >
            <h3 class="text-xl font-bold">Registration questions</h3>
            <div class="space-y-8">
                <div class="space-y-2">
                    <p
                        class="inline-flex items-center gap-1 text-gray-500 mb-1"
                    >
                        <i class="pi pi-id-card" /> Personal Information
                    </p>
                    <div class="flex gap-2">
                        <div
                            class="w-[8rem] p-4 bg-gray-100 hover:bg-gray-200 duration-150 rounded-2xl"
                        >
                            <div class="inline-flex flex-col gap-1">
                                <p class="text-sm text-gray-400">Required</p>
                                <p>
                                    <i class="pi pi-user" />&nbsp;
                                    <span class="text-lg">Name</span>
                                </p>
                            </div>
                        </div>
                        <div
                            class="w-[8rem] p-4 bg-gray-100 hover:bg-gray-200 duration-150 rounded-2xl"
                        >
                            <div class="inline-flex flex-col gap-1">
                                <p class="text-sm text-gray-400">Required</p>
                                <p>
                                    <i class="pi pi-at" />&nbsp;
                                    <span class="text-lg">Email</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-2">
                    <p
                        class="inline-flex items-center gap-1 text-gray-500 mb-1"
                    >
                        <i class="pi pi-question-circle" />Custom Questions
                    </p>
                    <div v-for="question in questions" :key="question.id">
                        <div
                            v-if="editingQuestion?.id !== question.id"
                            class="flex justify-between items-center p-5 bg-gray-100 hover:bg-gray-200 duration-150 rounded-2xl"
                        >
                            <div class="inline-flex flex-col gap-1">
                                <p class="text-sm text-gray-400">
                                    <i class="pi pi-pen-to-square text-xs" />
                                    Text
                                </p>
                                <p class="text-lg">{{ question.question }}</p>
                            </div>
                            <div>
                                <Button
                                    icon="pi pi-pencil"
                                    aria-label="Edit"
                                    severity="secondary"
                                    rounded
                                    text
                                    @click="editingQuestion = question"
                                />
                                <Button
                                    icon="pi pi-times"
                                    aria-label="Delete"
                                    severity="danger"
                                    rounded
                                    text
                                    @click="confirmDelete(question)"
                                />
                            </div>
                        </div>
                        <div
                            v-else
                            class="flex justify-between items-center p-5 bg-gray-200 hover:bg-gray-200 border border-primary duration-150 rounded-2xl"
                        >
                            <div class="w-full inline-flex flex-col gap-1">
                                <p class="text-sm text-gray-400">
                                    <i class="pi pi-pen-to-square text-xs" />
                                    Text
                                </p>
                                <InputText
                                    v-model="editingQuestion.question"
                                    required
                                    unstyled
                                    placeholder="Enter question"
                                    class="bg-transparent border-none outline-none text-lg"
                                />
                            </div>

                            <div class="flex justify-end gap-2">
                                <Button
                                    label="Save"
                                    icon="pi pi-check"
                                    @click="onSaveQuestion(editingQuestion)"
                                />
                                <Button
                                    label="Cancel"
                                    icon="pi pi-times"
                                    severity="secondary"
                                    @click="editingQuestion = null"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            @click="addQuestion"
                            class="w-full p-6 text-primary bg-primary-50 border border-primary rounded-2xl duration-150 hover:bg-primary-100"
                        >
                            <i class="pi pi-plus" /> Add new question
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex justify-end w-full gap-2">
                <Button label="Save" icon="pi pi-check" type="submit" />
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
                    @click="onToggleRegistrationStatus"
                />
            </div>
        </form>
    </div>
</template>
