<script setup lang="ts">
import type { IClassroomRequest } from "../../types/ClassroomRequest";

const { getUserClassroomRequests } = useRequestClassroom();
const toast = useToast();
let classroomRequests = ref<IClassroomRequest[]>([]);
// const classroomRequests = [
//   {
//     id: "67e926a45c16f001b3eb4d07",
//     classroomId: "67e1b3ce191ead32464ca1ed",
//     classroomDetail: {
//       coverImage: null,
//       title: "",
//       format: "ONSITE",
//       type: "LECTURE",
//       capacity: 0,
//       instructorName: "",
//       instructorAvatar: "",
//     },
//     ownerId: "673dd60e10c4ce4a4bcfbf84",
//     requestList: [
//       {
//         requestedBy: {
//           id: "674694ef32ddea4012d3c50b",
//           username: "Jerome",
//           profilePicture:
//             "https://lh3.googleusercontent.com/a/ACg8ocJNZD_DTWEev6zFRzznO7RKbXsE_KjO9htM8y5Nt44thxNOBWdZiA=s96-c",
//         },
//         requestedAt: "2025-03-30T11:10:28.336",
//       },
//     ],
//   },
// ];

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
