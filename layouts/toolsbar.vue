<script setup lang="ts">
import { signOut } from "firebase/auth";
import Image from "primevue/image";

const op = ref();
const router = useRouter();
const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
};

const auth = useFirebaseAuth();
const user = useCurrentUser();

const userPfp = user.value.photoURL;

const handleSignOut = async () => {
    try {
        if (auth) {
            await signOut(auth);
            await userAuth().logout();
        }
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

const handleProfileClick = () => {
    router.push("/profile");
    op.value.hide();
};
</script>
<template>
    <div class="sticky top-[10px] h-[calc(100vh-20px)]">
        <div
            class="flex justify-between h-full screen p-4 pb-0 bg-white border basis-64 w-64 rounded-3xl"
        >
            <div class="flex gap-2">
                <OverlayBadge
                    value="4"
                    severity="danger"
                    class="inline-flex"
                    size="small"
                >
                    <Button
                        icon="pi pi-bell"
                        severity="secondary"
                        rounded
                        outlined
                        v-tooltip="'Notifications'"
                        aria-label="Notifications"
                    />
                </OverlayBadge>
                <Button
                    icon="pi pi-cog"
                    severity="secondary"
                    rounded
                    outlined
                    v-tooltip="'Settings'"
                    aria-label="Settings"
                />
            </div>
            <Button
                icon="pi pi-bookmark"
                severity="secondary"
                rounded
                outlined
                aria-label="Bookmark"
                @click="toggle"
            >
                <Avatar :image="userPfp" shape="circle" />
            </Button>
            <Popover ref="op" class="pt-4">
                <div
                    class="flex flex-col justify-center items-center gap-4 w-[12rem]"
                >
                    <Image :alt="`${user.displayName} profile picture`">
                        <template #image>
                            <img
                                :src="userPfp"
                                :alt="`${user.displayName} profile picture`"
                                class="rounded-full w-24 h-24"
                            />
                        </template>
                    </Image>
                    <div class="text-center">
                        <h2 class="text-lg font-bold">
                            {{ user.displayName }}
                        </h2>
                        <p class="text-gray-500">{{ user.email }}</p>
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
</template>
