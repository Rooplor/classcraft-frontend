<script setup lang="ts">
const props = defineProps({
    to: {
        type: String,
        required: true,
    },
    id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    hasAction: {
        type: Boolean,
        default: true,
    },
});
const router = useRouter();
const path = ref(router.currentRoute.value.path);

const { deleteClassroom } = useClassroom();
const classroomStore = useClassroomStore();

const op = ref();
const toggle = (event: MouseEvent) => {
    op.value.toggle(event);
};

const handleEdit = () => {
    router.push(props.to);
    op.value.hide();
};

const handleDelete = () => {
    if (!props.id) return;
    deleteClassroom(props.id);
    classroomStore.removeClassroomById(props.id);
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
        class="flex justify-between items-center p-3 py-4 duration-100 rounded-lg hover:bg-gray-100"
    >
        <div class="flex gap-2">
            <!-- TODO: Change to class image -->
            <div class="h-6 bg-blue-500 rounded-md aspect-square" />
            <p>{{ name }}</p>
        </div>
        <Button
            @click.prevent="toggle"
            icon="pi pi-ellipsis-v"
            rounded
            severity="secondary"
            text
            aria-label="More"
            v-if="hasAction"
        />
        <Popover ref="op">
            <div class="flex flex-col gap-2">
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
                    @click="handleDelete"
                />
            </div>
        </Popover>
    </nuxt-link>
</template>
