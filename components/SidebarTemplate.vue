<script setup lang="ts">
import { signOut } from "firebase/auth";
import type { IClassroom } from "~/types/Classroom";

defineProps({
    closeCallback: {
        type: Function,
    },
});

const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore) as {
    classrooms: Ref<IClassroom[]>;
};
const sidebarStore = useSidebarStore();
const { isSidebarOpen } = storeToRefs(sidebarStore) as {
    isSidebarOpen: Ref<boolean>;
};

const op = ref();
const auth = useFirebaseAuth();
const router = useRouter();
const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
};

const user = useCurrentUser();

const handleProfileClick = () => {
    router.push("/profile");
    op.value.hide();
};

const handleSignOut = async () => {
    try {
        if (auth) {
            await signOut(auth);
            await useAuth().logout();
        }
    } catch (error) {
        console.error("Error signing out:", error);
    }
};
</script>

<template>
    <div class="flex flex-col gap-9">
        <div
            class="flex gap-2"
            :class="isSidebarOpen ? 'justify-between' : 'justify-center'"
        >
            <h1
                v-if="isSidebarOpen"
                class="inline-flex items-center text-xl text-primary"
            >
                <i class="pi pi-sparkles mr-2" />
                Class<span class="font-bold">Craft</span>
            </h1>
            <Button
                :icon="isSidebarOpen ? 'pi pi-angle-left' : 'pi pi-angle-right'"
                severity="secondary"
                rounded
                aria-label="Toggle sidebar"
                @click="
                    closeCallback
                        ? closeCallback()
                        : sidebarStore.toggleSidebar()
                "
            />
        </div>
        <div>
            <SidebarTab
                to="/class"
                label="Classroom"
                icon="pi pi-book"
                :isSidebarOpen="isSidebarOpen"
                @click="closeCallback?.()"
            />
            <SidebarTab
                to="/discussion"
                label="Request for class"
                icon="pi pi-comments"
                :isSidebarOpen="isSidebarOpen"
                @click="closeCallback?.()"
            />
        </div>
        <div
            :class="{
                'flex flex-col items-center': !isSidebarOpen,
            }"
        >
            <div v-if="isSidebarOpen" class="flex justify-between mb-5">
                <p class="text-slate-500">Your classes</p>
                <nuxt-link
                    to="/class/new/edit"
                    class="text-primary-500 flex items-center gap-1"
                >
                    <i class="pi pi-plus" />
                    <p>Add</p>
                </nuxt-link>
            </div>
            <Button v-else icon="pi pi-plus" text rounded />

            <SidebarTab
                v-for="classroom in classrooms"
                :key="classroom?.id"
                :to="`/class/${classroom?.id}/edit`"
                :classroom="classroom"
                :isCollapsed="isSidebarOpen"
                @click="closeCallback?.()"
            />
        </div>
    </div>

    <div
        class="w-full flex items-center border-t bg-white sticky bottom-0"
        :class="isSidebarOpen ? 'justify-between py-4' : 'justify-center py-2'"
    >
        <div class="flex gap-2 items-center">
            <Avatar :image="user?.photoURL || ''" shape="circle" size="large" />
            <div v-if="isSidebarOpen" class="leading-4 w-40">
                <p class="truncate">
                    {{ user?.displayName }}
                </p>
                <p class="text-slate-500 text-sm truncate">
                    {{ user?.email }}
                </p>
            </div>
        </div>
        <Button
            v-if="isSidebarOpen"
            icon="pi pi-ellipsis-h"
            severity="secondary"
            rounded
            outlined
            aria-label="Profile"
            @click="toggle"
        />
        <Popover ref="op" class="pt-4">
            <div
                class="flex flex-col justify-center items-center gap-4 w-[12rem]"
            >
                <Image :alt="`${user?.displayName} profile picture`">
                    <template #image>
                        <img
                            :src="
                                user?.photoURL?.replace('s96-c', 's384-c') || ''
                            "
                            :alt="`${user?.displayName} profile picture`"
                            class="rounded-full w-24 h-24"
                        />
                    </template>
                </Image>
                <div class="text-center">
                    <h2 class="text-lg font-bold">
                        {{ user?.displayName }}
                    </h2>
                    <p class="text-slate-500">{{ user?.email }}</p>
                </div>
                <div class="flex flex-col w-full gap-2">
                    <Button
                        label="Profile"
                        severity="secondary"
                        @click="handleProfileClick"
                    />
                    <Button
                        @click="handleSignOut"
                        label="Logout"
                        severity="danger"
                    />
                </div>
            </div>
        </Popover>
    </div>
</template>
