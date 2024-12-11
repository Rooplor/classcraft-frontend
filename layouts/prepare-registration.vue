<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import type { IClassroom } from "../types/Classroom";

interface Question {
    init?: Question;
    id: number;
    question: string;
}

const questions: Ref<Question[]> = ref([]);
const editingQuestion = ref<Question | null>(null);
const confirm = useConfirm();
const toast = useToast();
const { updateRegistrationUrl } = useClassroom();
const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
    editingClassroom: Ref<IClassroom | null>;
};
const hasUrl = ref(editingClassroom?.value?.registrationUrl ? true : false);

const initialValues = editingClassroom.value && {
    registrationUrl: editingClassroom.value.registrationUrl,
};

const schema = yup.object({
    registrationUrl: yup
        .string()
        .required("Registration Url is required")
        .matches(
            /^https?:\/\/[\w-]+(\.[\w-]+)+([\w-.,@?^=%&:/~+#]*[\w-@?^=%&/~+#])?$/,
            "Invalid Url"
        ),
});

const { defineField, handleSubmit, errors } = useForm({
    initialValues,
    validationSchema: schema,
});

const [registrationUrl] = defineField("registrationUrl");

const onSaveQuestion = (question: Question) => {
    const index = questions.value.findIndex((q) => q.id === question.init?.id);
    questions.value[index].question = question.question;
    editingQuestion.value = null;
};
const addQuestion = () => {
    let newQuestion: Question = {
        id: questions.value.length + 1,
        question: "",
    };
    questions.value.push(newQuestion);
    onEdit(newQuestion);
};
const removeQuestion = (id: number) => {
    questions.value = questions.value.filter((question) => question.id !== id);
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
            editingQuestion.value = null;
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

const toggleHasRegistrationUrl = () => {
    hasUrl.value = !hasUrl.value;
};

const onSubmit = handleSubmit((values: any) => {
    if (!errors.registrationUrl) {
        handleUpdateRegistrationUrl();
    }
});

const handleUpdateRegistrationUrl = () => {
    if (!editingClassroom.value) return;

    updateRegistrationUrl(
        editingClassroom.value.id,
        registrationUrl.value
    ).then((res) => {
        if (res.success) {
            classroomStore.setEditingClassroom(res.result);
            toast.add({
                severity: "success",
                summary: "Registration Url updated",
                group: "tc",
                life: 1000,
            });
        }
    });
};

const onEdit = (question: Question) => {
    editingQuestion.value = {
        init: question,
        ...question,
    };
};
</script>

<template>
    <div>
        <form
            @submit="onSubmit"
            class="p-6 bg-white border rounded-3xl space-y-4"
        >
            <div class="flex gap-2 justify-between">
                <h3 class="text-xl font-bold">
                    {{ hasUrl ? "Registration Url" : "Registration Questions" }}
                </h3>
                <div>
                    <button
                        type="button"
                        v-ripple
                        class="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg duration-150 hover:bg-slate-200"
                        @click="toggleHasRegistrationUrl"
                    >
                        <span v-if="hasUrl" class="flex items-center gap-2">
                            <i class="pi pi-list-check" />
                            Use ClassCraft registration
                        </span>
                        <span v-else class="flex items-center gap-2">
                            <i class="pi pi-link" />
                            Use registration Url
                        </span>
                    </button>
                </div>
            </div>

            <div v-if="hasUrl" class="w-full space-y-2">
                <label for="capacity">
                    <p
                        class="inline-flex items-center gap-1 text-slate-400 mb-1"
                    >
                        <i class="pi pi-link" />Enter your registration form Url
                    </p></label
                >
                <div class="w-full flex gap-2">
                    <div class="flex w-full flex-col gap-2">
                        <InputText
                            id="registrationUrl"
                            v-model="registrationUrl"
                            aria-describedby="registrationUrl-help"
                            placeholder="Enter registration Url"
                            :class="errors.registrationUrl && 'p-invalid'"
                            class="w-full"
                        />
                        <VeeErrorMessage
                            name="registrationUrl"
                            class="text-red-500"
                        />
                    </div>
                    <div>
                        <Button label="Save" icon="pi pi-check" type="submit" />
                    </div>
                </div>
                <VeeErrorMessage name="capacity" class="text-red-500" />
            </div>

            <div v-else class="space-y-8">
                <div class="space-y-2">
                    <p
                        class="inline-flex items-center gap-1 text-slate-400 mb-1"
                    >
                        <i class="pi pi-id-card" />
                        Personal Information
                    </p>
                    <div class="flex gap-2">
                        <div
                            v-ripple
                            class="w-[8rem] p-4 bg-slate-100 hover:bg-slate-200 duration-150 rounded-2xl"
                        >
                            <div class="inline-flex flex-col gap-1">
                                <p class="text-sm text-slate-400">Required</p>
                                <p>
                                    <i class="pi pi-user text-primary" />&nbsp;
                                    <span class="text-lg">Name</span>
                                </p>
                            </div>
                        </div>
                        <div
                            v-ripple
                            class="w-[8rem] p-4 bg-slate-100 hover:bg-slate-200 duration-150 rounded-2xl"
                        >
                            <div class="inline-flex flex-col gap-1">
                                <p class="text-sm text-slate-400">Required</p>
                                <p>
                                    <i class="pi pi-at text-primary" />&nbsp;
                                    <span class="text-lg">Email</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="space-y-2">
                    <p
                        class="inline-flex items-center gap-1 text-slate-400 mb-1"
                    >
                        <i class="pi pi-question-circle" />Custom Questions
                    </p>
                    <div v-for="question in questions" :key="question.id">
                        <div
                            v-if="editingQuestion?.init?.id !== question.id"
                            class="flex justify-between items-center p-5 bg-slate-100 hover:bg-slate-200 duration-150 rounded-2xl"
                        >
                            <div class="inline-flex flex-col gap-1">
                                <p class="text-sm text-slate-400">
                                    <i
                                        class="pi pi-pen-to-square"
                                        style="font-size: 12px"
                                    />
                                    Text
                                </p>
                                <p class="text-lg">{{ question.question }}</p>
                            </div>
                            <div v-if="editingQuestion === null">
                                <Button
                                    icon="pi pi-pencil"
                                    aria-label="Edit"
                                    severity="secondary"
                                    rounded
                                    text
                                    @click="onEdit(question)"
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
                            class="flex justify-between items-center p-5 bg-slate-200 hover:bg-slate-200 border border-primary duration-150 rounded-2xl"
                        >
                            <div class="w-full inline-flex flex-col gap-1">
                                <label
                                    :for="`question-${question.id}`"
                                    class="text-sm text-slate-400"
                                >
                                    <i
                                        class="pi pi-pen-to-square"
                                        style="font-size: 12px"
                                    />
                                    Text
                                </label>
                                <InputText
                                    :id="`question-${question.id}`"
                                    v-model="editingQuestion.question"
                                    unstyled
                                    placeholder="Enter question"
                                    class="bg-transparent border-none outline-none text-lg"
                                />
                            </div>

                            <div class="flex justify-end gap-2">
                                <Button
                                    label="Save"
                                    icon="pi pi-check"
                                    :disabled="!editingQuestion.question"
                                    @click="onSaveQuestion(editingQuestion)"
                                />
                                <Button
                                    label="Cancel"
                                    severity="secondary"
                                    @click="
                                        editingQuestion?.init?.question === ''
                                            ? confirmDelete(question)
                                            : (editingQuestion = null)
                                    "
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            :disabled="
                                editingQuestion !== null && questions.length > 0
                            "
                            v-ripple
                            @click="addQuestion"
                            class="w-full p-6 border rounded-2xl duration-150"
                            :class="
                                editingQuestion !== null && questions.length > 0
                                    ? 'cursor-not-allowed text-slate-400 bg-slate-100 border-slate-100'
                                    : 'text-primary bg-primary-50 border-primary hover:bg-primary-100'
                            "
                        >
                            <i class="pi pi-plus" />&nbsp; Add New Question
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
