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
        <!-- <div
            class="bg-white flex flex-col border rounded-xl gap-6 p-8 overflow-hidden"
        >
            <h2 class="text-xl font-bold">Upcoming classes</h2>
            <div class="flex gap-[10px] w-full overflow-hidden">
                <button
                    v-for="(classroom, index) in classrooms"
                    :key="index"
                    @click="() => $router.push(`/class/${classroom.id}`)"
                    class="w-96 h-60 text-white bg-gray-200 flex flex-col justify-end p-3 rounded-xl relative overflow-clip text-left"
                >
                    <div
                        class="bg-gradient-to-t from-blue-500 absolute w-full h-full top-0 left-0 opacity-80"
                    />
                    <div class="flex flex-col gap-2 z-10">
                        <h1 class="font-bold text-xl">
                            {{ classroom.title }}
                        </h1>
                        <div class="flex flex-col gap-1">
                            <p>
                                <i class="pi pi-calendar" />
                                {{
                                    classroom.date
                                        .map((date) =>
                                            new Date(date).toDateString()
                                        )
                                        .join(", ")
                                }}
                            </p>
                            <p>
                                <i class="pi pi-map-marker" />
                                {{ classroom.venue?.name || "TBA" }}
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div> -->
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
