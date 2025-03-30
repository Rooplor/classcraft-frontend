<script setup lang="ts">
import type { IClassroom } from '../../types/Classroom';

defineProps<{
  classroom: IClassroom;
}>();
</script>
<template>
  <div class="bg-white p-6 border rounded-2xl flex flex-col gap-4">
    <div class="flex gap-4">
      <div class="w-24 h-24 aspect-square border rounded-full overflow-clip">
        <Image preview>
          <template #image>
            <img
              :src="classroom.instructorAvatar"
              :alt="`${classroom.instructorName} profile image`"
              class="w-24 h-24 aspect-square border rounded-full object-cover"
            />
          </template>
          <template #original="slotProps">
            <img
              :src="classroom.instructorAvatar"
              :alt="`${classroom.instructorName} profile image`"
              :style="slotProps.style"
              @click="slotProps.previewCallback"
              class="w-[52rem] h-[52rem] aspect-square object-cover"
            />
          </template>
        </Image>
      </div>
      <div class="space-y-4">
        <div>
          <p class="text-xl font-bold">
            {{ classroom.instructorName }}
          </p>
          <p>{{ classroom.instructorBio }}</p>
        </div>
        <div>
          <p class="text-slate-500">Familiarity to the topic</p>
          <p>
            {{ classroom.instructorFamiliarity || "" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
