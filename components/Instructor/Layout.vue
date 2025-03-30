<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

defineProps<{
  classroom: IClassroom;
}>();
</script>
<template>
  <div>
    <p class="text-xl font-bold mb-4">Who Will Be Teaching Me?</p>
    <InstructorItem :classroom="classroom" />
  </div>
</template>
