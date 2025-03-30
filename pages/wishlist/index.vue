<script setup lang="ts">
import type { IClassroomRequest } from "../../types/ClassroomRequest";

const { getUserClassroomRequests } = useRequestClassroom();
const toast = useToast();
let classroomRequests = ref<IClassroomRequest[]>([]);

try {
  let res = await getUserClassroomRequests();
  if (res.success) {
    classroomRequests.value = res.result;
  }
} catch (error) {
  toast.add({
    severity: "error",
    summary: "Cannot get classroom requests",
    detail: "Error getting classroom requests, please try again later",
  });
}
</script>
<template>
  <div class="w-full">
    <Headerbar />
    <div class="w-full max-w-screen-lg mx-auto">
      <div class="flex flex-col gap-4 pb-2 pt-8">
        <h1 class="text-3xl font-bold">Wishlist</h1>
        <div class="space-y-2">
          <ClassroomRequestListItem
            v-for="(request, index) in classroomRequests"
            :key="index"
            :classroom="request.classroomDetail"
            :requestList="request.requestList"
          />
          <div
            v-if="classroomRequests?.length === 0"
            class="flex flex-col items-center gap-4 h-96 justify-center"
          >
            <p class="text-slate-400">No classroom requests found.</p>
            <nuxt-link to="/class/new">
              <Button
                label="Create a Classroom"
                severity="secondary"
                icon="pi pi-plus"
              />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
