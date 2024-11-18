<script setup lang="ts">
const user = useCurrentUser();
const router = useRouter();
const classroomStore = useClassroomStore();
const { getClassroomByUserId } = useClassroom();
const { getUserProfile } = useUser();

const userID = (await getUserProfile()).result.id;

classroomStore.setClassrooms((await getClassroomByUserId([userID])).result);

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
        <NuxtLayout name="sidebar" class="px-2 hidden md:block" />
        <slot />
    </div>
</template>
