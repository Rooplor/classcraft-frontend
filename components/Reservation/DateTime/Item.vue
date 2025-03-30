<script setup lang="ts">
import type { IReservationDateAndVenue } from "../../../types/Classroom";

defineProps<{
  date: IReservationDateAndVenue;
}>();
</script>
<template>
  <div>
    <p>
      {{
        isoToDateWithTimezone(date.date.startDateTime).toLocaleString("en-GB", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
    </p>
    <p class="text-sm text-slate-500">
      {{
        isoToDateWithTimezone(date.date.startDateTime).toLocaleString("en-GB", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        })
      }}
      -
      {{
        isoToDateWithTimezone(date.date.endDateTime).toLocaleString("en-GB", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        })
      }}
    </p>
  </div>
</template>
