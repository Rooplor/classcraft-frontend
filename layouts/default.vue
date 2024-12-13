<script setup lang="ts">
import { signOut } from "firebase/auth";

const auth = useFirebaseAuth();
const user = useCurrentUser();
const router = useRouter();
const classroomStore = useClassroomStore();
const { getClassroomByUserId } = useClassroom();
const { getUserProfile } = useUser();

try {
    const userID = (await getUserProfile()).result.id;
    classroomStore.setClassrooms((await getClassroomByUserId([userID])).result);
} catch {
    if (auth) {
        await signOut(auth);
    }
}

watch(user, (currentUser, prevUser) => {
    if (prevUser !== currentUser) {
        return router.replace("/login");
    }
});
</script>

<template>
    <Toast position="top-center" group="tc" />
    <ConfirmDialog />
    <ScrollTop
        v-animateonscroll="{
            enterClass: 'animate-fadein',
        }"
    />
    <div class="flex bg-slate-50 min-h-screen">
        <NuxtLayout name="sidebar" />
        <div class="w-full px-2">
            <slot />
        </div>
    </div>
</template>
