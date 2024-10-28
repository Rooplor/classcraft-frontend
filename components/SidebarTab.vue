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
        default: "",
    },
    icon: {
        type: String,
    },
});
const router = useRouter();
const path = ref(router.currentRoute.value.path);

const { deleteClassroom } = useClassroom();
const classroomStore = useClassroomStore();

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
    <nuxt-link
        :to="to"
        :class="
            path.includes(to)
                ? 'text-blue-500 bg-blue-100 hover:!bg-blue-100'
                : ''
        "
        class="flex items-center p-3 py-4 duration-100 rounded-lg hover:bg-gray-100"
    >
        <div class="flex w-full gap-2">
            <img
                :src="classroom?.coverImage"
                :alt="classroom?.title"
                v-if="classroom?.coverImage"
                class="h-12 w-12 rounded-lg aspect-square object-cover"
            />
            <div
                v-else-if="!label"
                class="h-12 flex justify-center items-center bg-gray-200 text-gray-400 rounded-lg aspect-square"
            >
                <i class="pi pi-image" />
            </div>
            <i v-else :class="icon" />
            <div class="space-y-1 w-1/2 overflow-hidden">
                <Badge
                    v-if="!label"
                    :value="classroom?.published ? 'Published' : 'Draft'"
                    severity="secondary"
                    size="small"
                />
                <p class="w-full truncate">{{ classroom?.title || label }}</p>
            </div>
        </div>
        <Button
            v-if="!label"
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
</template>
