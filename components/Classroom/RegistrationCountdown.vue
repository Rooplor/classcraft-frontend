<script setup lang="ts">
defineProps<{
  label: string;
  date: string;
}>();
</script>
<template>
  <p
    v-if="isoToDateWithTimezone(date) > new Date()"
    class="py-1 px-2 text-sm text-primary bg-primary-100 inline-block rounded-lg mb-3"
  >
    {{ label + ` ` + countdownTimer(isoToDateWithTimezone(date)) }}
  </p>
</template>
