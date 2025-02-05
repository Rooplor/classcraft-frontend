<script setup lang="ts">
import { signOut } from "firebase/auth";
import type { IClassroom } from "../types/Classroom";

const props = defineProps({
  q: {
    type: String,
    default: "",
  },
});

interface SearchDialogOption {
  label: string;
  items: {
    icon?: string;
    image?: {
      src?: string;
      class: string;
    };
    label: string;
    onClick: () => void;
  }[];
}

const searchInput = ref(props.q);
const menu = ref();
const user = useCurrentUser();
const op = ref();
const isSearchDialogVisible = ref();
const auth = useFirebaseAuth();
const router = useRouter();
const { searchByTitleOrDetail } = useClassroom();
const searchedClassrooms = ref<IClassroom[]>([]);
const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore) as {
  classrooms: Ref<IClassroom[]>;
};

const emit = defineEmits(["search"]);

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

const searchDialogOptions: SearchDialogOption[] = [
  {
    label: "Shortcuts",
    items: [
      {
        icon: "pi pi-plus",
        label: "Create new classroom",
        onClick: () => {
          router.push("/class/new/edit");
        },
      },
      {
        icon: "pi pi-plus",
        label: "Create new topic request",
        onClick: () => {},
      },
      {
        icon: "pi pi-home",
        label: "Open home page",
        onClick: () => {
          router.push("/");
        },
      },
      {
        image: {
          src: user.value?.photoURL || "",
          class: "w-6 h-6 rounded-full",
        },
        label: "Open profile page",
        onClick: () => {
          router.push("/profile");
        },
      },
    ],
  },
  {
    label: "Hosting",
    items: [
      ...classrooms.value.map((classroom) => ({
        image: { src: classroom.coverImage, class: "w-6 h-6 rounded" },
        label: classroom.title,
        onClick: () => {
          router.push(`/class/${classroom.id}`);
        },
      })),
    ],
  },
];

const searchResults = computed(() => {
  return [
    ...searchDialogOptions
      .map((option) => {
        return {
          label: option.label,
          items: option.items.filter((item) => {
            return item.label
              .toLowerCase()
              .includes(searchInput.value.toLowerCase());
          }),
        };
      })
      .filter((option) => option.items.length > 0),
    // searchedClassrooms.value.length > 0 && {
    //   label: "Explore",
    //   items: [
    //     ...searchedClassrooms.value.map((classroom) => ({
    //       image: { src: classroom.coverImage, class: "w-6 h-6 rounded" },
    //       label: classroom.title,
    //       onClick: () => {
    //         router.push(`/class/${classroom.id}`);
    //       },
    //     })),
    //   ],
    // },
  ];
});

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

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "k") {
    e.preventDefault();
    isSearchDialogVisible.value = !isSearchDialogVisible.value;
  }
});

watch(searchInput, async (value) => {
  if (value.trim() === "") {
    searchedClassrooms.value = [];
    return;
  }
  searchedClassrooms.value = (await searchByTitleOrDetail(value)).result;
});
</script>

<template>
  <div class="sticky top-0 z-20 py-2 mb-6">
    <div
      class="flex gap-1 md:gap-2 justify-between items-center p-2 bg-white m-auto w-full rounded-full border"
    >
      <div class="md:hidden lg:block">
        <DrawerButton />
      </div>
      <div />
      <div class="flex gap-1 md:gap-2 items-center justify-center">
        <Button
          icon="pi pi-search"
          label="Search (Ctrl + K)"
          rounded
          @keyup.enter="
            () => {
              isSearchDialogVisible = true;
            }
          "
          severity="secondary"
          @click="isSearchDialogVisible = true"
        />
        <div class="hidden md:block">
          <Button
            label="Create"
            icon="pi pi-plus"
            rounded
            @click="toggleMenu"
          />
        </div>
        <div class="md:hidden">
          <Button icon="pi pi-plus" rounded @click="toggleMenu" />
        </div>
        <Menu
          ref="menu"
          id="overlay_menu"
          :model="items"
          :popup="true"
          class="!rounded-xl p-1"
        >
          <template #item="{ item, props }">
            <router-link v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
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
          <Avatar :image="user?.photoURL || ''" shape="circle" size="normal" />
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="isSearchDialogVisible"
    position="top"
    :modal="true"
    :draggable="false"
    dismissableMask
    class="w-full max-w-screen-sm p-2"
  >
    <template #header>
      <div />
    </template>
    <template #container>
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchInput"
          placeholder="Search anything..."
          autofocus
          fluid
          variant="filled"
          @keyup.enter="
            () => {
              if (searchInput.trim() === '') return;
              router.push(`/search?q=${searchInput.trim()}`);
              emit('search', searchInput.trim());
            }
          "
        />
        <InputIcon
          v-if="searchInput.trim() !== ''"
          class="pi pi-times cursor-pointer"
          @click="searchInput = ''"
        />
      </IconField>
      <SearchDialogLayout :searchDialogOptions="searchResults" />
    </template>
  </Dialog>
  <Popover ref="op" class="!rounded-xl">
    <div class="flex flex-col justify-center items-center gap-2">
      <div
        class="flex gap-2 p-3 rounded-lg cursor-pointer hover:bg-slate-100 duration-200"
        @click="handleProfileClick"
      >
        <Avatar :image="user?.photoURL || ''" shape="circle" size="large" />
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
</template>
