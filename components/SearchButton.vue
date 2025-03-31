<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";

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

const router = useRouter();
const { searchByTitleOrDetail } = useClassroom();
const user = useCurrentUser();
const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore) as {
  classrooms: Ref<IClassroom[]>;
};
const searchInput = ref("");
const isSearchDialogVisible = ref();
const searchedClassrooms = ref<IClassroom[]>([]);
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
        icon: "pi pi-home",
        label: "Open home page",
        onClick: () => {
          router.push("/");
        },
      },
      {
        icon: "pi pi-inbox",
        label: "Open classroom requests page",
        onClick: () => {
          router.push("/request");
        },
      },
      {
        icon: "pi pi-bookmark",
        label: "Open wishlist page",
        onClick: () => {
          router.push("/wishlist");
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
  let result = [
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
  ];

  if (searchedClassrooms.value.length > 0) {
    result.push({
      label: "Search results",
      items: searchedClassrooms.value.map((classroom) => ({
        image: { src: classroom.coverImage, class: "w-6 h-6 rounded" },
        label: classroom.title,
        onClick: () => {
          router.push(`/class/${classroom.id}`);
        },
      })),
    });
  }

  return result;
});

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

watch(router.currentRoute, () => {
  isSearchDialogVisible.value = false;
});
</script>
<template>
  <div
    @keyup.enter="
      () => {
        isSearchDialogVisible = true;
      }
    "
    severity="secondary"
    @click="isSearchDialogVisible = true"
    class="cursor-pointer"
  >
    <slot />
  </div>
  <Dialog
    v-model:visible="isSearchDialogVisible"
    position="top"
    :modal="true"
    :draggable="false"
    dismissableMask
    class="w-full max-w-screen-sm"
  >
    <template #container>
      <div class="px-2">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="searchInput"
            placeholder="Search anything..."
            autofocus
            fluid
            variant="filled"
            class="!text-xl !bg-transparent !border-none !rounded-none !py-4"
          />
          <InputIcon
            v-if="searchInput.trim() !== ''"
            class="pi pi-times cursor-pointer"
            @click="searchInput = ''"
          />
        </IconField>
      </div>
      <div class="border-t border-slate-300" />
      <div class="p-3">
        <SearchDialogLayout
          v-if="searchResults.length > 0"
          :searchDialogOptions="searchResults"
        />
        <div v-else>
          <p class="text-center p-10 text-slate-500">No results found</p>
        </div>
      </div>
    </template>
  </Dialog>
</template>
