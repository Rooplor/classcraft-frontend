<script setup lang="ts">
const props = defineProps({
    to: {
        type: String,
        required: true,
    },
    classroom: {
        type: Object,
    },
    label: {
        type: String,
    },
    icon: {
        type: String,
    },
});
const router = useRouter();
const path = ref(router.currentRoute.value.path);

const { deleteClassroom } = useClassroom();
const classroomStore = useClassroomStore();
const sidebarStore = useSidebarStore();
const { isSidebarOpen } = storeToRefs(sidebarStore) as {
    isSidebarOpen: Ref<boolean>;
};
const op = ref();
const confirm = useConfirm();
const toast = useToast();
const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
};

const handleEdit = () => {
    router.push(props.to);
    op.value.hide();
};

const confirmDelete = (name: string) => {
    confirm.require({
        message: `Are you sure you want to delete "${name}" classroom?`,
        header: "Delete Confirmation",
        icon: "pi pi-exclamation-triangle",
        rejectProps: {
            label: "Cancel",
        },
        acceptProps: {
            label: "Delete",
            text: true,
        },
        accept: () => {
            handleDelete();
            toast.add({
                severity: "error",
                summary: "Deleted",
                detail: `Your classroom has been deleted`,
                group: "tc",
                life: 3000,
            });
        },
    });
};

const handleDelete = () => {
    if (props.label) return;
    deleteClassroom(props.classroom?.id);
    classroomStore.removeClassroomById(props.classroom?.id);
    op.value.hide();
};

watch(router.currentRoute, () => {
    path.value = router.currentRoute.value.path;
});
</script>
<template>
    <div v-ripple class="w-full rounded-xl hover:bg-slate-100 duration-100">
        <nuxt-link
            :to="to"
            :class="
                (path.includes(to) &&
                    'text-primary-500 bg-primary-100 hover:!bg-primary-100') +
                ` ${
                    isSidebarOpen
                        ? 'p-2 justify-between'
                        : 'p-1 justify-center h-16'
                }`
            "
            class="flex items-center"
        >
            <div
                class="flex items-center gap-2"
                :class="{ 'w-5/6': isSidebarOpen }"
            >
                <img
                    v-if="classroom?.coverImage"
                    :src="classroom?.coverImage"
                    :alt="classroom?.title"
                    class="w-full h-full max-w-14 max-h-14 rounded-lg aspect-square object-cover"
                />
                <div
                    v-else-if="!label"
                    class="flex justify-center items-center w-14 h-14 bg-slate-200 border border-slate-300 text-slate-400 rounded-lg aspect-square"
                >
                    <i class="pi pi-image" />
                </div>
                <i
                    v-else
                    :class="icon"
                    :style="!isSidebarOpen && 'font-size: 1.5rem'"
                />
                <div
                    v-if="isSidebarOpen"
                    class="space-y-1 w-3/4 overflow-hidden"
                >
                    <div v-if="!label" class="flex gap-1">
                        <Badge
                            :value="
                                classroom?.published ? 'Published' : 'Draft'
                            "
                            :severity="
                                classroom?.published ? 'success' : 'secondary'
                            "
                            size="small"
                        />
                        <div
                            v-if="classroom?.registrationStatus"
                            class="text-[0.6rem] flex items-center text-white bg-orange-500 rounded-full px-0.5"
                        >
                            <i
                                class="pi pi-stop-circle aspect-square animate-fadeout animate-alternate-reverse animate-infinite animate-duration-700"
                            />
                        </div>
                    </div>
                    <p class="w-full truncate">
                        {{ classroom?.title || label }}
                    </p>
                </div>
            </div>
            <Button
                v-if="!label && isSidebarOpen"
                severity="secondary"
                icon="pi pi-ellipsis-v"
                aria-label="More"
                rounded
                text
                @click.prevent="toggle"
            />
            <Popover ref="op">
                <div class="flex flex-col gap-1">
                    <Button
                        label="Edit"
                        icon="pi pi-pencil"
                        severity="secondary"
                        @click="handleEdit"
                    />
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        severity="danger"
                        text
                        @click="confirmDelete(classroom?.title)"
                    />
                </div>
            </Popover>
        </nuxt-link>
    </div>
</template>
