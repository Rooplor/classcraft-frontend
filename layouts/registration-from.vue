<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { IForm } from "../types/Form";
const { getFormById, submitForm } = useClassroomForm();
const { getUserProfile } = useUser();

const router = useRouter();
const toast = useToast();
const { id } = router.currentRoute.value.params;

const classroomForm = ref<IForm>({} as IForm);
const formData = ref<{ [key: string]: any }>({});
const userProfile = ref();

const onSubmit = async (event: Event) => {
  event.preventDefault();

  let res = await submitForm({
    id: id.toString(),
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

  console.log(userProfile.value);

  formData.value = {
    "Full Name": userProfile.value.username,
    Email: userProfile.value.email,
    Phone: userProfile.value.phone,
  };
});
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col">
    <div class="flex flex-col gap-8">
      <div
        v-if="classroomForm"
        v-for="(field, index) in classroomForm.fields"
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
      <Button type="submit" rounded size="large" class="font-medium"
        >Join</Button
      >
    </div>
  </form>
</template>
