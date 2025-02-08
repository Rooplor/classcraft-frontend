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
const { getFormById, updateForm } = useClassroomForm();
const { setRegistrationStatus, setPublishStatus } = useClassroom();
const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
  editingClassroom: Ref<IClassroom>;
};
const openDate = ref<Date | null>(null);
const closeDate = ref<Date | null>(null);

const updateFormQuestions = () => {
  return updateForm({
    id: editingClassroom.value?.id,
    classroomId: editingClassroom.value?.id,
    title: "Registration Form",
    description: "Please fill out the form to register",
    openDate: openDate.value?.toISOString(),
    closeDate: closeDate.value?.toISOString(),
    fields: [
      ...questions.value.map((q) => ({
        name: q.question,
        type: "string",
        required: true,
        validation: EFieldValidation.Text,
        options: ["string"],
      })),
    ],
  });
};

const onSaveQuestion = async (question: Question) => {
  const index = questions.value.findIndex((q) => q.id === question.init?.id);
  questions.value[index].question = question.question;
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
      severity: "danger",
      text: true,
    },
    accept: async () => {
      removeQuestion(question.id);
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
    },
  });
};

const onEdit = (question: Question) => {
  editingQuestion.value = {
    init: question,
    ...question,
  };
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

const onOpenRegistration = async () => {
  if (!editingClassroom.value.published) {
    await setPublishStatus(editingClassroom.value.id, true);
  }

  let registrationRes = await setRegistrationStatus(
    editingClassroom.value.id,
    true
  );
  if (registrationRes.success) {
    updateClassroomStore(registrationRes.result);
    showRegistrationToast(editingClassroom.value.registrationStatus);
  }
};

const onCloseRegistration = async () => {
  let res = await setRegistrationStatus(editingClassroom.value.id, false);
  if (res.success) {
    updateClassroomStore(res.result);
    showRegistrationToast(editingClassroom.value.registrationStatus);
  }
};

editingClassroom.value &&
  getFormById(editingClassroom.value.id).then((data) => {
    const { result } = data;
    openDate.value = result.openDate
      ? isoToDateWithTimezone(result.openDate)
      : null;
    closeDate.value = result.closeDate
      ? isoToDateWithTimezone(result.closeDate)
      : null;

    questions.value = result.fields.map((field, index) => ({
      id: index,
      question: field.name,
    }));
  });
</script>

<template>
  <div class="space-y-2">
    <div class="p-6 bg-white border rounded-2xl space-y-4">
      <div class="flex flex-col-reverse sm:flex-row gap-4 justify-between">
        <h3 class="text-xl font-bold">Registration Questions</h3>
      </div>
      <div class="space-y-8">
        <div class="space-y-2">
          <p class="inline-flex items-center gap-1 text-slate-400 mb-1">
            <i class="pi pi-id-card" />
            Personal Information
          </p>
          <div class="flex flex-col sm:flex-row gap-2">
            <div
              class="sm:w-[8rem] p-4 bg-slate-100 hover:bg-slate-200 duration-150 rounded-xl cursor-not-allowed"
            >
              <div class="inline-flex flex-col gap-1">
                <p class="text-sm text-slate-400">Required</p>
                <p>
                  <i class="pi pi-user text-slate-500" />&nbsp;
                  <span class="text-lg">Name</span>
                </p>
              </div>
            </div>
            <div
              class="sm:w-[8rem] p-4 bg-slate-100 hover:bg-slate-200 duration-150 rounded-xl cursor-not-allowed"
            >
              <div class="inline-flex flex-col gap-1">
                <p class="text-sm text-slate-400">Required</p>
                <p>
                  <i class="pi pi-at text-slate-500" />&nbsp;
                  <span class="text-lg">Email</span>
                </p>
              </div>
            </div>
            <div
              class="sm:w-[8rem] p-4 bg-slate-100 hover:bg-slate-200 duration-150 rounded-xl cursor-not-allowed"
            >
              <div class="inline-flex flex-col gap-1">
                <p class="text-sm text-slate-400">Required</p>
                <p>
                  <i class="pi pi-phone text-slate-500" />&nbsp;
                  <span class="text-lg">Phone</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <p class="inline-flex items-center gap-1 text-slate-400 mb-1">
            <i class="pi pi-question-circle" />Custom Questions
          </p>
          <div
            v-for="question in questions.filter((q) => {
              return (
                q.question !== 'Email' &&
                q.question !== 'Full Name' &&
                q.question !== 'Phone'
              );
            })"
            :key="question.id"
          >
            <div
              v-if="editingQuestion?.init?.id !== question.id"
              class="flex justify-between items-center p-4 bg-slate-100 hover:bg-slate-200 duration-150 rounded-xl"
            >
              <div class="inline-flex flex-col gap-1">
                <p class="text-sm text-slate-400">
                  <i class="pi pi-pen-to-square" style="font-size: 12px" />
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
              class="flex justify-between items-center p-4 bg-slate-200 hover:bg-slate-200 border border-primary duration-150 rounded-xl"
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
          <div>
            <button
              :disabled="editingQuestion !== null && questions.length > 0"
              v-ripple
              @click="addQuestion"
              class="w-full p-6 rounded-xl duration-150"
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
    </div>
    <div class="p-6 bg-white border rounded-2xl space-y-4">
      <h3 class="text-xl font-bold">Schedule Registration</h3>
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="space-y-2">
          <label
            for="date"
            class="block text-sm font-medium text-slate-700 mb-1"
          >
            From (Optional)
          </label>
          <DatePicker
            id="date"
            v-model="openDate"
            name="openDate"
            showIcon
            iconDisplay="input"
            fluid
            showTime
            hourFormat="24"
            :minDate="new Date()"
            date-format="D d M yy"
            showButtonBar
            placeholder="Select opening date"
            v-on:update:model-value="updateFormQuestions"
          />
        </div>
        <div class="space-y-2">
          <label
            for="date"
            class="block text-sm font-medium text-slate-700 mb-1"
          >
            To (Optional)
          </label>
          <DatePicker
            id="date"
            v-model="closeDate"
            name="closeDate"
            showIcon
            iconDisplay="input"
            fluid
            showTime
            hourFormat="24"
            :minDate="openDate ? openDate : new Date()"
            date-format="D d M yy"
            showButtonBar
            placeholder="Select close date "
            v-on:update:model-value="updateFormQuestions"
          />
        </div>
      </div>
      <div class="flex justify-end pt-4">
        <Button
          v-if="
            openDate &&
            editingClassroom?.registrationStatus &&
            new Date() <= openDate
          "
          :label="`Scheduled registration (opening in ${countdownTimer(
            openDate
          )})`"
          severity="secondary"
          fluid
          rounded
          size="large"
          :disabled="!editingClassroom"
          @click="onCloseRegistration"
        />
        <Button
          v-else-if="
            closeDate &&
            editingClassroom?.registrationStatus &&
            new Date() <= closeDate
          "
          :label="`Close registration (closing in ${countdownTimer(
            closeDate
          )})`"
          severity="secondary"
          fluid
          rounded
          size="large"
          :disabled="!editingClassroom"
          @click="onCloseRegistration"
        />
        <Button
          v-else-if="editingClassroom?.registrationStatus"
          :label="`Close registration now`"
          severity="secondary"
          fluid
          rounded
          size="large"
          :disabled="!editingClassroom"
          @click="onCloseRegistration"
        />
        <Button
          v-else
          :label="
            openDate || closeDate
              ? 'Schedule registration'
              : 'Open registration now'
          "
          :icon="openDate || closeDate ? 'pi pi-calendar' : 'pi pi-check'"
          severity="contrast"
          fluid
          rounded
          size="large"
          :disabled="!editingClassroom || editingClassroom.stepperStatus < 3"
          @click="onOpenRegistration"
        />
      </div>
    </div>
  </div>
</template>
