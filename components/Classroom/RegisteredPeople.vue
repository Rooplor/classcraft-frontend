<script setup lang="ts">
import type { IUser } from "../../types/User";

defineProps({
  usersInClassroom: {
    type: Array as PropType<Partial<IUser>[]>,
    required: true,
  },
  seatsLeft: {
    type: Number as PropType<number>,
    required: true,
  },
  registrationStatus: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
});
</script>
<template>
  <div class="mt-4">
    <div
      v-if="usersInClassroom.length > 0"
      class="flex justify-center items-center gap-2"
    >
      <AvatarGroup class="flex justify-center">
        <Avatar
          v-for="(user, index) in usersInClassroom.slice(0, 5)"
          :key="index"
          :image="user.profilePicture"
          shape="circle"
        />
      </AvatarGroup>
      <p class="text-slate-500 text-left">
        {{ usersInClassroom.length }} people joined this class
        <span v-if="seatsLeft > 0">({{ seatsLeft }} seats left)</span>
        <span v-else>(Full)</span>
      </p>
    </div>
    <div
      v-else-if="registrationStatus && usersInClassroom.length === 0"
      class="flex justify-center items-center gap-2 text-slate-500"
    >
      <i class="pi pi-sparkles" size="large" />
      <p>Be the first to join this class</p>
    </div>
  </div>
</template>
