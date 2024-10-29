<script setup lang="ts">
const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore);
</script>

<template>
    <div class="sticky top-[10px] h-[calc(100vh-20px)]">
        <div
            class="flex flex-col overflow-y-auto justify-between h-full screen py-6 px-3 pb-0 bg-white border basis-64 w-72 rounded-3xl"
        >
            <div class="flex flex-col gap-9">
                <h1 class="inline-flex items-center text-xl">
                    <i class="pi pi-sparkles mr-2" />
                    Class<span class="font-bold">Craft</span>
                </h1>
                <div>
                    <SidebarTab
                        to="/class"
                        label="Classroom"
                        icon="pi pi-book"
                    />
                    <SidebarTab
                        to="/discussion"
                        label="Request for class"
                        icon="pi pi-comments"
                    />
                </div>
                <div>
                    <div class="flex justify-between mb-5">
                        <p class="text-gray-500">Your classes</p>
                        <nuxt-link to="/class/new/edit" class="text-blue-500">
                            + Add
                        </nuxt-link>
                    </div>
                    <SidebarTab
                        v-for="classroom in classrooms"
                        :key="classroom?.id"
                        :to="`/class/${classroom?.id}/edit`"
                        :classroom="classroom"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
