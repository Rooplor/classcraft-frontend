<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";

const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore);

const bio = ref(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa rerum doloremque iure illo quae consequatur repellendus. Adipisci quibusdam, debitis magni distinctio accusantium accusamus nihil maxime autem id labore est dicta!"
);
const user = useCurrentUser();
const isEditing = ref(false);

const publishedClassrooms = computed(() =>
    classrooms.value.filter((classroom: IClassroom) => classroom.published)
);

const handleEdit = () => {
    isEditing.value = true;
};

const handleSave = () => {
    isEditing.value = false;
};

useHead({
    title: `${user?.value?.displayName}'s Profile · ClassCraft`,
    meta: [
        {
            name: "description",
            content: `View ${user?.value?.displayName}'s profile on ClassCraft`,
        },
        {
            name: "keywords",
            content: "profile, user, classcraft",
        },
    ],
});
</script>

<template>
    <div
        class="w-full flex flex-col gap-[10px] p-[10px] max-w-screen-lg mx-auto"
    >
        <div
            class="sticky z-20 top-2 flex basis-full gap-1 overflow-auto bg-white rounded-full border p-2 md:hidden"
        >
            <DrawerButton />
        </div>
        <div
            class="flex flex-col gap-8 bg-white border rounded-3xl p-8 md:flex-row"
        >
            <img
                :src="user?.photoURL?.replace('s96-c', 's512-c')"
                :alt="user?.displayName as string"
                class="rounded-full w-52 h-52 aspect-square object-cover bg-slate-200"
            />
            <div class="w-full space-y-4">
                <div class="space-y-2">
                    <div class="flex items-center gap-4">
                        <h1 class="text-2xl font-bold">
                            {{ user?.displayName }}
                        </h1>
                        <Button
                            severity="secondary"
                            label="Edit"
                            icon="pi pi-pencil"
                            size="small"
                            :disabled="isEditing"
                            @click="handleEdit"
                        />
                    </div>
                    <p class="text-slate-500">{{ user?.email }}</p>
                </div>
                <p class="space-x-2">
                    <span>2 Classes</span> <span>5 Followers</span>
                </p>
                <div v-if="isEditing">
                    <Textarea
                        label="Bio"
                        placeholder="Tell us about yourself"
                        v-model="bio"
                        rows="5"
                        style="resize: none"
                        class="w-full"
                    />
                    <div class="flex justify-end gap-1">
                        <Button
                            label="Cancel"
                            severity="secondary"
                            @click="isEditing = false"
                        />
                        <Button label="Save" @click="handleSave" />
                    </div>
                </div>
                <p v-else class="text-slate-500">{{ bio }}</p>
            </div>
        </div>
        <div class="space-y-4 mt-6">
            <h2 class="text-xl font-bold">Hosted classrooms</h2>
            <div v-if="publishedClassrooms?.length >= 0" class="space-y-[10px]">
                <ClassroomItem
                    v-for="(classroom, index) in publishedClassrooms"
                    :key="index"
                    :classroom="classroom"
                />
            </div>
            <div v-else>
                <p class="py-16 text-slate-500 text-center">
                    No classes hosted yet
                </p>
            </div>
        </div>
    </div>
</template>
