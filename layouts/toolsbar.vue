<script setup lang="ts">
import { useUserStore } from "../stores/user";

const op = ref();
const router = useRouter();
const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
};
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { getUserById } = useUser();

const handleProfileClick = () => {
    router.push("/profile");
    op.value.hide();
};

userStore.setUser(
    await getUserById("670cb591c20cf62a6859dd4d").then((res) => res.result)
);
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
                <Avatar :image="user.profilePicture" shape="circle" />
            </Button>
            <Popover ref="op">
                <div
                    class="flex flex-col justify-center items-center gap-4 w-[12rem]"
                >
                    <img
                        :src="user.profilePicture"
                        alt=""
                        class="rounded-full w-32 h-32 aspect-square"
                    />
                    <div class="text-center">
                        <h2 class="text-lg font-bold">{{ user.username }}</h2>
                        <p class="text-gray-500">{{ user.email }}</p>
                    </div>
                    <div class="flex flex-col w-full gap-2">
                        <!-- click and close popover -->
                        <Button
                            label="Profile"
                            severity="secondary"
                            @click="handleProfileClick"
                        />
                        <Button label="Logout" severity="danger" />
                    </div>
                </div>
            </Popover>
        </div>
    </div>
</template>
