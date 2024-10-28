<script setup lang="ts">
const user = useCurrentUser();
const router = useRouter();
const classroomStore = useClassroomStore();
const { getAllClassroom, getClassroomByUserId } = useClassroom();
const { getProfile } = useUser();

let resProfile = await getProfile();
console.log(resProfile);

// let resClassroom = await getClassroomByUserId(resProfile.result);


// classroomStore.setMyClassrooms(
//     await getClassroomByUserId(await getProfile().result).result
// );
classroomStore.setFeedClassrooms(await getAllClassroom());
classroomStore.setMyClassrooms(await getAllClassroom());

watch(user, (currentUser, prevUser) => {
    if (prevUser !== currentUser) {
        return router.replace("/login");
    }
});
</script>

<template>
    <Toast position="top-center" group="tc" />
    <ConfirmDialog />
    <div class="flex bg-gray-50 min-h-screen">
        <NuxtLayout name="sidebar" class="px-2" />
        <slot />
        <NuxtLayout name="toolsbar" class="px-2" />
    </div>
</template>
