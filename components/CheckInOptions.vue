<script setup lang="ts">
import { EAttendeeStatus } from "../types/Form";

defineProps<{
  submissionId: string;
  day: number;
}>();

const emit = defineEmits<{
  onSelect: [submissionId: string, status: EAttendeeStatus, day: number];
}>();

const op = ref();

const togglePopOver = (event: MouseEvent) => {
  op.value.toggle(event);
};

const options = ref([
  { label: "Checked In", value: EAttendeeStatus.Present, severity: "success" },
  { label: "Late", value: EAttendeeStatus.Late, severity: "warn" },
  {
    label: "Not Checked In",
    value: EAttendeeStatus.Pending,
    severity: "secondary",
  },
]);
</script>

<template>
  <div class="cursor-pointer" @click="togglePopOver">
    <slot />
  </div>
  <Popover ref="op">
    <div class="flex flex-col">
      <div
        v-for="option in options"
        :key="option.value"
        class="flex items-center gap-2 hover:bg-slate-100 p-2 cursor-pointer rounded duration-200"
        @click="
          emit('onSelect', submissionId, option.value, day);
          op.toggle();
        "
      >
        <Tag :severity="option.severity" :value="option.label" />
      </div>
    </div>
  </Popover>
</template>
