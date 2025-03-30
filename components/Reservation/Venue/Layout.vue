<script setup lang="ts">
import { EVenueRequestStatus, type IClassroom } from '../../../types/Classroom';
import type { IVenue } from '../../../types/Venue';

defineProps<{
  classroom: IClassroom;
  venues: IVenue[];
}>();
</script>
<template>
  <div class="flex items-center gap-3">
    <i
      class="pi pi-map-marker p-3 text-xl rounded-xl border bg-slate-100 text-slate-500"
    />
    <div>
      <div
        v-if="
          venues.length > 0 &&
          classroom.venueStatus === EVenueRequestStatus.APPROVED
        "
      >
        <p>
          {{ venues[0]?.room }},
          {{ venues[0]?.location?.building }}
          <span v-if="venues[0]?.location.floor">
            fl. {{ venues[0]?.location.floor }}
          </span>
          <span v-if="venues.length > 1" class="font-light italic">
            and {{ venues.length - 1 }} more
          </span>
        </p>
      </div>
      <p v-else>TBA</p>
    </div>
  </div>
</template>
