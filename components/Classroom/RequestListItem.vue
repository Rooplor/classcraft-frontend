<script setup lang="ts">
defineProps<{
  classroom: any;
  requestList: any;
}>();
</script>
<template>
  <div
    class="flex gap-3 bg-white border rounded-2xl p-3 duration-150 hover:border-slate-300 hover:drop-shadow-sm animate-fadein md:gap-6"
  >
    <div
      alt="class image"
      class="flex justify-center items-center aspect-square w-40 h-40 bg-slate-200 rounded-xl overflow-clip lg:w-52 lg:h-52"
    >
      <img
        v-if="classroom.coverImage"
        :src="classroom.coverImage"
        alt="class image"
        class="w-full h-full object-cover"
      />
      <span class="text-slate-400" v-else>
        <i class="pi pi-image" style="font-size: 4rem" />
      </span>
    </div>
    <div class="w-full flex flex-col gap-8">
      <div class="flex flex-col gap-2 md:gap-4">
        <div class="space-y-2">
          <h1 class="font-bold text-xl line-clamp-1">
            {{ classroom.title }}
          </h1>
          <div class="hidden md:flex gap-2 flex-wrap">
            <Tag
              icon="pi pi-comment"
              severity="secondary"
              :value="classroom.type"
              rounded
              class="border"
            />
            <Tag
              icon="pi pi-desktop"
              severity="secondary"
              :value="classroom.format"
              rounded
              class="border"
            />
            <Tag
              icon="pi pi-users"
              severity="secondary"
              :value="classroom.capacity.toString()"
              rounded
              class="border"
            />
          </div>
        </div>
        <div class="flex items-center gap-2 text-slate-500 text-sm">
          <img
            :src="classroom.instructorAvatar ? classroom.instructorAvatar : ''"
            :alt="classroom.instructorName ? classroom.instructorName : ''"
            class="w-6 h-6 rounded-full"
          />
          <p>By {{ classroom.instructorName }}</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <AvatarGroup class="flex justify-start">
          <Avatar
            v-for="(requestUser, index) in requestList.slice(0, 6)"
            :key="index"
            :image="requestUser.requestedBy.profilePicture"
            shape="circle"
          />
          <Avatar
            v-if="requestList.length > 6"
            label="+{{ requestList.length - 6 }}"
            shape="circle"
          />
        </AvatarGroup>
        <p class="text-slate-500">
          {{ requestList.length }} people want to join
        </p>
      </div>
      <!-- <div class="flex items-center gap-2 text-slate-500 text-sm">
        <Button label="Recreate this class" icon="pi pi-plus" fluid />
        <Button
          label="Remove from wishlist"
          icon="pi pi-bookmark-fill"
          severity="secondary"
          fluid
        />
      </div> -->
    </div>
  </div>
</template>
