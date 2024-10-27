<script setup lang="ts">
const user = useCurrentUser();
const router = useRouter();
const classroomStore = useClassroomStore();
const { getAllClassroom } = useClassroom();

classroomStore.setClassrooms(await getAllClassroom());

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
