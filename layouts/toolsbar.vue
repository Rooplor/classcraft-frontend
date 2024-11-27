<script setup lang="ts">
import { signOut } from "firebase/auth";
import Image from "primevue/image";

enum Tab {
    NOTIFICATION = 1,
    SETTINGS = 2,
}

const op = ref();
const router = useRouter();
const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
};
const curTab = ref<Tab>(Tab.NOTIFICATION);
const auth = useFirebaseAuth();
const user = useCurrentUser();

const userPfp = user.value?.photoURL as string;

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

const changeTabTo = (tab: Tab) => {
    switch (tab) {
        case Tab.NOTIFICATION:
            curTab.value = Tab.NOTIFICATION;
            break;
        case Tab.SETTINGS:
            curTab.value = Tab.SETTINGS;
            break;
        default:
            break;
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
            class="space-y-6 h-full p-4 pb-0 bg-white border basis-64 w-64 rounded-3xl"
        >
            <div class="flex justify-between">
                <div class="flex gap-2">
                    <OverlayBadge
                        value="4"
                        severity="danger"
                        class="inline-flex"
                        size="small"
                    >
                        <Button
                            icon="pi pi-bell"
                            :severity="
                                curTab === Tab.NOTIFICATION
                                    ? 'primary'
                                    : 'secondary'
                            "
                            rounded
                            outlined
                            v-tooltip="'Notifications'"
                            aria-label="Notifications"
                            @click="changeTabTo(Tab.NOTIFICATION)"
                        />
                    </OverlayBadge>
                    <Button
                        icon="pi pi-cog"
                        :severity="
                            curTab === Tab.SETTINGS ? 'primary' : 'secondary'
                        "
                        rounded
                        outlined
                        v-tooltip="'Settings'"
                        aria-label="Settings"
                        @click="changeTabTo(Tab.SETTINGS)"
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
                        <Image :alt="`${user?.displayName} profile picture`">
                            <template #image>
                                <img
                                    :src="userPfp"
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
            <div class="space-y-4">
                <p class="text-lg font-bold">
                    {{
                        curTab === Tab.SETTINGS
                            ? "Settings"
                            : curTab === Tab.NOTIFICATION
                            ? "Notifications"
                            : ""
                    }}
                </p>
                <div class="space-y-1">
                    <NotificationTab
                        v-for="i in 5"
                        v-if="curTab === Tab.NOTIFICATION"
                        :key="i"
                        to="/"
                    >
                        This is a notification
                    </NotificationTab>
                </div>
            </div>
        </div>
    </div>
</template>
