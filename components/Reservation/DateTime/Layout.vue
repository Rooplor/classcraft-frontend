<script setup lang="ts">
import type { IReservationDateAndVenue } from "../../../types/Classroom";

defineProps<{
  dates: IReservationDateAndVenue[];
}>();
</script>
<template>
  <div class="inline-flex items-start justify-start gap-3">
    <div>
      <i
        class="pi pi-calendar p-3 text-xl rounded-xl border bg-slate-100 text-slate-500"
      />
      <div class="border-r border-slate-300 w-1/2 h-full" />
    </div>
    <div class="space-y-8">
      <ReservationDateTimeItem v-for="(date, index) in dates" :key="index" :date="date" />
    </div>
  </div>
</template>
