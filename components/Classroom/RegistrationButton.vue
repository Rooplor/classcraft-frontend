<script setup lang="ts">
defineProps<{
  classroomTitle: string;
}>();

const emit = defineEmits(["submitted"]);

const isRegistrationDialogVisible = ref(false);
</script>
<template>
  <Button
    size="large"
    :label="`Join Now`"
    rounded
    :severity="'primary'"
    @click="isRegistrationDialogVisible = true"
  />
  <Dialog
    v-model:visible="isRegistrationDialogVisible"
    :header="`Registration for &quot;${classroomTitle}&quot;`"
    :modal="true"
    dismissableMask
    :draggable="false"
    position="center"
    class="w-full max-w-screen-sm m-auto"
    :style="{
      'border-radius': '1.5rem',
    }"
  >
    <RegistrationForm
      @submitted="
        (res) => {
          emit('submitted', res);
          isRegistrationDialogVisible = false;
        }
      "
    />
  </Dialog>
</template>
