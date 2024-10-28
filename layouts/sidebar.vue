<script setup lang="ts">
const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore);
</script>

<template>
    <div class="sticky top-[10px] h-[calc(100vh-20px)]">
        <div
            class="flex flex-col overflow-y-auto justify-between h-full screen py-6 px-3 pb-0 bg-white border basis-64 w-64 rounded-3xl"
        >
            <div class="flex flex-col gap-9">
                <h1 class="text-xl">
                    Class<span class="font-bold">Craft</span>
                </h1>
                <div>
                    <SidebarTab
                        to="/class"
                        name="Classroom"
                        :hasAction="false"
                    />
                    <SidebarTab
                        to="/discussion"
                        name="Discussion"
                        :hasAction="false"
                    />
                </div>
                <div>
                    <div class="flex justify-between mb-5">
                        <p class="text-gray-500">Your classes</p>
                        <nuxt-link to="/class/new/edit" class="text-blue-500">
                            + Add
                        </nuxt-link>
                    </div>
                    <div v-if="classrooms.length < 0">
                        <SidebarTab
                            v-for="classroom in classrooms"
                            :key="classroom.id"
                            :id="classroom.id"
                            :to="`/class/${classroom.id}/edit`"
                            :name="classroom.title"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
