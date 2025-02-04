<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { IForm } from "../types/Form";
const { getFormById, submitForm } = useClassroomForm();
const { getUserProfile } = useUser();

const router = useRouter();
const toast = useToast();
const { id } = router.currentRoute.value.params;

const classroomForm = ref<IForm>({} as IForm);
const customQuestions = computed(() => {
  return classroomForm.value.fields?.filter(
    (field) =>
      field.name !== "Full Name" &&
      field.name !== "Email" &&
      field.name !== "Phone"
  );
});
const formData = ref<{ [key: string]: any }>({});
const userProfile = ref();

const onSubmit = async (event: Event) => {
  event.preventDefault();

  let res = await submitForm({
    formId: id.toString(),
    classroomId: id.toString(),
    responses: formData.value,
    submittedBy: "",
    approvedByOwner: classroomForm.value.isOwnerApprovalRequired ? false : true,
  });

  if (res.success) {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Form submitted successfully",
      group: "tc",
    });
    window.location.reload();
  }
};

onMounted(async () => {
  classroomForm.value = (await getFormById(id.toString())).result;
  userProfile.value = (await getUserProfile()).result;
  formData.value = {
    "Full Name": userProfile.value.username,
    Email: userProfile.value.email,
    Phone: userProfile.value.phone,
  };
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-8">
    <div>
      <p class="inline-flex items-center gap-1 text-slate-400 mb-2">
        <i class="pi pi-id-card" />
        Personal Information
      </p>
      <div class="flex flex-col gap-4 border rounded-2xl p-4 bg-slate-50">
        <div class="flex flex-col gap-2">
          <label for="Full Name">Full Name</label>
          <InputText
            id="Full Name"
            v-model="formData['Full Name']"
            required
            type="text"
            :value="formData['Full Name']"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="Email">Email</label>
          <InputText
            id="Email"
            v-model="formData['Email']"
            required
            type="email"
            :value="formData['Email']"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="Phone">Phone</label>
          <InputText
            id="Phone"
            v-model="formData['Phone']"
            required
            type="tel"
            :value="formData['Phone']"
          />
        </div>
      </div>
    </div>
    <div v-if="customQuestions.length > 0">
      <p class="inline-flex items-center gap-1 text-slate-400 mb-2">
        <i class="pi pi-question-circle" />
        Other questions
      </p>
      <div class="flex flex-col gap-4 border rounded-2xl p-4 bg-slate-50">
        <div
          v-for="(field, index) in customQuestions"
          :key="index"
          class="flex flex-col gap-2"
        >
          <label :for="field.name">{{ field.name }}</label>
          <InputText
            :id="field.name"
            v-model="formData[field.name]"
            :required="field.required"
            :type="field.type"
            :value="formData[field.name]"
          />
        </div>
      </div>
    </div>
    <Button type="submit" rounded size="large" class="font-medium">Join</Button>
  </form>
</template>
