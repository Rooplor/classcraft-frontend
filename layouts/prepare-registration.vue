<script setup lang="ts">
// import { useForm } from "vee-validate";
// import type { InputTypeHTMLAttribute } from "vue";
// import * as yup from "yup";

// const schema = yup.object({
//     registrationUrl: yup.string().required(),
// });

// const { defineField, handleSubmit, resetForm, errors } = useForm({
//     validationSchema: schema,
// });

// const [registrationUrl] = defineField("registrationUrl");

// const onSubmit = handleSubmit((values: any) => {
//     // TODO: send data to backend
//     console.table("values: ", values);
// });

interface Question {
    id: number;
    question: string;
}

const questions: Ref<Question[]> = ref([
    {
        id: 1,
        question: "What is your name?",
    },
    {
        id: 2,
        question: "What is your age?",
    },
    {
        id: 3,
        question: "Why are you gay?",
    },
]);

const editingQuestion = ref<Question | null>(null);

const onSubmit = (e: Event) => {
    e.preventDefault();
    console.log("values: ", questions.value);
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
</script>

<template>
    <div>
        <form
            @submit="onSubmit"
            class="p-6 bg-white border rounded-3xl space-y-4"
        >
            <h3 class="text-xl font-bold">Registration questions</h3>
            <div class="flex flex-col gap-2">
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
                                @click="removeQuestion(question.id)"
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

            <div class="flex justify-end w-full gap-2">
                <Button label="Save" icon="pi pi-check" type="submit" />
                <Button
                    label="Open for registration"
                    icon="pi pi-lock-open"
                    severity="contrast"
                    @click=""
                />
            </div>
        </form>
    </div>
</template>
