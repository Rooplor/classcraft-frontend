<script setup lang="ts">
import { signOut } from "firebase/auth";

const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore);

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
    <div class="sticky top-[10px] h-[calc(100vh-20px)]">
        <div
            class="relative flex flex-col overflow-y-auto justify-between h-full screen py-6 px-3 pb-0 bg-white border basis-64 w-72 rounded-3xl overflow-clip"
        >
            <div class="flex flex-col gap-9">
                <h1 class="inline-flex items-center text-xl text-primary">
                    <i class="pi pi-sparkles mr-2" />
                    Class<span class="font-bold">Craft</span>
                </h1>
                <div>
                    <SidebarTab
                        to="/class"
                        label="Classroom"
                        icon="pi pi-book"
                    />
                    <SidebarTab
                        to="/discussion"
                        label="Request for class"
                        icon="pi pi-comments"
                    />
                </div>
                <div>
                    <div class="flex justify-between mb-5">
                        <p class="text-slate-500">Your classes</p>
                        <nuxt-link
                            to="/class/new/edit"
                            class="text-primary-500"
                        >
                            + Add
                        </nuxt-link>
                    </div>
                    <SidebarTab
                        v-for="classroom in classrooms"
                        :key="classroom?.id"
                        :to="`/class/${classroom?.id}/edit`"
                        :classroom="classroom"
                    />
                </div>
            </div>
            <div
                class="w-full flex justify-between items-center py-4 border-t bg-white sticky bottom-0"
            >
                <div class="flex gap-2">
                    <Avatar :image="user?.photoURL || ''" shape="circle" />
                    <div class="leading-4 w-40">
                        <p class="truncate">
                            {{ user?.displayName }}
                        </p>
                        <p class="text-slate-500 text-sm truncate">
                            {{ user?.email }}
                        </p>
                    </div>
                </div>
                <Button
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
                                        user?.photoURL?.replace(
                                            's96-c',
                                            's384-c'
                                        ) || ''
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
                            <!-- click and close popover -->
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
        </div>
    </div>
</template>
