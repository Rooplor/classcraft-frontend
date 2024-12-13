<script setup lang="ts">
import { signOut } from "firebase/auth";

const user = useCurrentUser();
const op = ref();
const auth = useFirebaseAuth();
const router = useRouter();

const sidebarStore = useSidebarStore();
const { isSidebarOpen } = storeToRefs(sidebarStore) as {
    isSidebarOpen: Ref<boolean>;
};

const props = defineProps({
    q: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["search"]);

const search = ref(props.q);
const menu = ref();
const items = ref([
    {
        label: "Classroom",
        icon: "pi pi-book",
        route: "/class/new/edit",
    },
    {
        label: "Request topic",
        icon: "pi pi-comment",
        route: "/class/new/edit",
    },
]);

const toggleMenu = (event: MouseEvent) => {
    menu.value.toggle(event);
};

const togglePopOver = (event: MouseEvent) => {
    op.value.toggle(event);
};

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
    <div class="sticky top-0 z-20 py-2 mb-6">
        <div
            class="flex gap-1 md:gap-2 justify-between items-center p-2 bg-white m-auto w-full rounded-full border"
        >
            <div class="md:hidden lg:block">
                <DrawerButton />
            </div>
            <div class="w-full md:w-auto md:block">
                <IconField class="!w-full">
                    <InputIcon class="pi pi-search" />
                    <InputText
                        v-model="search"
                        placeholder="Search"
                        fluid
                        variant="filled"
                        class="!rounded-full lg:!w-[32rem]"
                        :class="isSidebarOpen ? '!w-full' : '!w-[28rem]'"
                        @keyup.enter="
                            () => {
                                if (search.trim() === '') return;
                                router.push(`/search?q=${search.trim()}`);
                                emit('search', search.trim());
                            }
                        "
                    />
                    <InputIcon
                        v-if="search.trim() !== ''"
                        class="pi pi-times"
                        @click="search = ''"
                    />
                </IconField>
            </div>
            <div class="flex gap-1 md:gap-2 items-center justify-center">
                <div class="hidden md:block">
                    <Button
                        label="Create"
                        severity="secondary"
                        icon="pi pi-plus"
                        rounded
                        @click="toggleMenu"
                    />
                </div>
                <div class="md:hidden">
                    <Button
                        severity="secondary"
                        icon="pi pi-plus"
                        rounded
                        @click="toggleMenu"
                    />
                </div>
                <Menu
                    ref="menu"
                    id="overlay_menu"
                    :model="items"
                    :popup="true"
                    class="!rounded-xl p-1"
                >
                    <template #item="{ item, props }">
                        <router-link
                            v-slot="{ href, navigate }"
                            :to="item.route"
                            custom
                        >
                            <a
                                v-ripple
                                :href="href"
                                v-bind="props.action"
                                @click="navigate"
                            >
                                <span :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                            </a>
                        </router-link>
                    </template>
                </Menu>
                <div
                    class="flex items-center p-1 hover:bg-slate-200 rounded-full duration-300 cursor-pointer"
                    @click="togglePopOver"
                >
                    <Avatar
                        :image="user?.photoURL || ''"
                        shape="circle"
                        size="normal"
                    />
                </div>
                <Popover ref="op" class="!rounded-xl">
                    <div
                        class="flex flex-col justify-center items-center gap-2"
                    >
                        <div
                            class="flex gap-2 p-3 rounded-lg cursor-pointer hover:bg-slate-100 duration-200"
                            @click="handleProfileClick"
                        >
                            <Avatar
                                :image="user?.photoURL || ''"
                                shape="circle"
                                size="large"
                            />
                            <div>
                                <h2 class="font-bold">
                                    {{ user?.displayName }}
                                </h2>
                                <p class="text-sm text-slate-500">
                                    {{ user?.email }}
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col w-full gap-2">
                            <Button
                                @click="handleSignOut"
                                label="Logout"
                                text
                                icon="pi pi-sign-out"
                                severity="danger"
                            />
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
    </div>
</template>
