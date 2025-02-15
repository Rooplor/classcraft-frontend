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
        await useAuth().logout();
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
    <div class="flex bg-slate-100 h-screen overflow-hidden">
        <NuxtLayout name="sidebar" />
        <div class="w-full h-screen p-2 pl-0 bg-white">
            <div class="h-full rounded-xl overflow-auto border px-2 bg-slate-50">
                <slot />
            </div>
        </div>
    </div>
</template>
