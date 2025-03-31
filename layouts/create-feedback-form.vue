<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";
import { EFieldValidation } from "../types/Form";

interface Question {
  init?: Question;
  id: number;
  question: string;
}

const questions: Ref<Question[]> = ref([]);
const editingQuestion = ref<Question | null>(null);
const confirm = useConfirm();
const toast = useToast();
const { getFormById, updateFeedbackForm, getClassroomFormSubmission } =
  useClassroomForm();
const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const customQuestions = computed(() => {
  return questions.value;
});

const onSaveQuestion = async (question: Question) => {
  const index = questions.value.findIndex((q) => q.id === question.init?.id);
  questions.value[index].question = question.question;
  try {
    const res = await updateFormQuestions();
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Saved",
        detail: `Your question has been saved`,
        group: "tc",
        life: 3000,
      });
      editingQuestion.value = null;
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Could not save",
      detail: "There was an error saving the question. Please try again later.",
      group: "tc",
      life: 3000,
    });
  }
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

const updateFormQuestions = () => {
  return updateFeedbackForm(editingClassroom.value.id, [
    ...questions.value.map((q) => ({
      name: q.question,
      type: "string",
      required: true,
      validation: EFieldValidation.Text,
      options: ["string"],
    })),
  ]);
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
      severity: "danger",
      text: true,
    },
    accept: async () => {
      removeQuestion(question.id);
      try {
        const res = await updateFormQuestions();
        if (res.success) {
          editingQuestion.value = null;
          toast.add({
            severity: "error",
            summary: "Deleted",
            detail: `Your question has been deleted`,
            group: "tc",
            life: 3000,
          });
        }
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Could not delete",
          detail:
            "There was an error deleting the question. Please try again later.",
          group: "tc",
          life: 3000,
        });
      }
    },
  });
};

const onEdit = (question: Question) => {
  editingQuestion.value = {
    init: question,
    ...question,
  };
};

if (editingClassroom.value) {
  try {
    let res = await getFormById(editingClassroom.value.id);
    if (res.success) {
      const { result } = res;

      questions.value = result.feedback.map((field, index) => ({
        id: index,
        question: field.name,
      }));
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Could not fetch questions",
      detail: "There was an error fetching questions. Please try again later.",
      group: "tc",
      life: 3000,
    });
  }
}
</script>
<template>
  <div class="bg-white p-4 rounded-xl border">
    <div class="space-y-2">
      <div class="flex justify-end">
        <Button
          label="Add New Question"
          icon="pi pi-plus"
          size="small"
          text
          @click="addQuestion"
        />
      </div>
      <div
        class="flex justify-between items-center p-4 border bg-slate-100 hover:bg-slate-200 duration-150 rounded-lg"
      >
        <div class="inline-flex flex-col gap-1">
          <p class="text-sm text-slate-400">
            <i class="pi pi-pen-to-square" style="font-size: 12px" />
            Text
          </p>
          <p class="text-lg">Rating</p>
        </div>
      </div>
      <div
        v-if="customQuestions.length > 0"
        v-for="question in customQuestions.filter(
          (q) => q.question !== 'Rating'
        )"
        :key="question.id"
      >
        <div
          v-if="editingQuestion?.init?.id !== question.id"
          class="flex justify-between items-center p-4 border bg-slate-100 hover:bg-slate-200 duration-150 rounded-lg"
        >
          <div class="inline-flex flex-col gap-1">
            <p class="text-sm text-slate-400">
              <i class="pi pi-pen-to-square" style="font-size: 12px" />
              Text
            </p>
            <p class="text-lg">{{ question.question }}</p>
          </div>
          <!-- hidden if Rating -->
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
          class="flex justify-between items-center p-4 bg-slate-200 hover:bg-slate-200 border border-primary duration-150 rounded-lg"
        >
          <div class="w-full inline-flex flex-col gap-1">
            <label
              :for="`question-${question.id}`"
              class="text-sm text-slate-400"
            >
              <i class="pi pi-pen-to-square" style="font-size: 12px" />
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
      <div v-else>
        <p class="text-slate-400 text-center py-8">
          No feedback questions added.
        </p>
      </div>
    </div>
  </div>
</template>
