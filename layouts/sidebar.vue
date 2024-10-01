<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClassroomStore } from '../stores/classroom';

const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore);
const { getAllClassroom } = useClassroom();

classroomStore.setClassrooms(await getAllClassroom());
</script>

<template>
    <div
        class="sticky top-0 flex flex-col justify-between h-full screen p-4 pb-0 bg-white border basis-72 w-72 rounded-xl"
    >
        <div class="flex flex-col gap-9">
            <h1 class="text-xl">Class<span class="font-bold">Craft</span></h1>
            <div>
                <SidebarTab to="/home" name="Home" />
            </div>
            <div>
                <div class="flex justify-between mb-5">
                    <p class="text-gray-500">Your classes</p>
                    <nuxt-link to="/class/new/edit" class="text-blue-500">
                        + Add
                    </nuxt-link>
                </div>
                <SidebarTab
                    :to="`/class/${classroom.id}/edit`"
                    :name="classroom.title"
                    v-for="classroom in classrooms"
                />
            </div>
        </div>

        <div class="flex items-center justify-between px-2 py-4 border-t">
            <div class="flex">
                <Avatar
                    image="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                    class="mr-2"
                    size="large"
                    shape="circle"
                />
                <div>
                    <p class="font-medium">Jerome Tana</p>
                    <p class="text-gray-500">@username</p>
                </div>
            </div>
            <Button
                icon="pi pi-ellipsis-h"
                severity="secondary"
                text
                rounded
                aria-label="Filter"
            />
        </div>
    </div>
</template>
