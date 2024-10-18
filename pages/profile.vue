<script setup lang="ts">
import { useUserStore } from '../stores/user';

const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
    <div class="w-full flex flex-col gap-[10px] p-[10px]">
        <div class="flex gap-8 bg-white border rounded-xl p-8">
            <img
                :src="user.profilePicture"
                :alt="user.username"
                class="rounded-full w-52 h-52 aspect-square object-cover bg-gray-200"
            />
            <div class="space-y-4">
                <div>
                    <div class="flex items-center gap-4">
                        <h1 class="text-2xl font-bold">{{ user.username }}</h1>
                        <Button label="Follow" icon="pi pi-plus" />
                    </div>
                    <p class="text-gray-500">{{ user.email }}</p>
                </div>
                <p class="space-x-2">
                    <span>2 Classes</span> <span>5 Followers</span>
                </p>
                <p class="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsa rerum doloremque iure illo quae consequatur
                    repellendus. Adipisci quibusdam, debitis magni distinctio
                    accusantium accusamus nihil maxime autem id labore est
                    dicta!
                </p>
            </div>
        </div>
        <div class="flex flex-col gap-6 p-8 bg-white rounded-lg border">
            <h2 class="text-xl font-bold">Hosted classes</h2>
            <div class="space-y-[10px]">
                <ClassroomItem
                    v-for="(classroom, index) in classrooms"
                    :key="index"
                    :classroom="classroom"
                    class="border-none"
                />
            </div>
        </div>
    </div>
</template>
