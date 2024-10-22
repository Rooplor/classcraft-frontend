<script setup lang="ts">
import Feedbar from "../../../layouts/Feedbar.vue";
import type { IClassroom } from "../../../types/Classroom";

const route = useRouter();
const { id } = route.currentRoute.value.params;
const { getClassroomById } = useClassroom();

const classroom: IClassroom =
    id && typeof id === "string" ? await getClassroomById(id) : null;

</script>
<template>
    <div class="w-full px-[10px] flex flex-col gap-[10px]">
        <Feedbar />
        <div class="flex gap-[10px]">
            <img
                :src="classroom.imageUrl"
                :alt="`${classroom.title} class cover image`"
                class="w-96 h-96 aspect-square bg-gray-200 border rounded-3xl"
            />
            <div
                class="w-full bg-white p-3 border rounded-3xl flex flex-col gap-10"
            >
                <h1 class="text-2xl font-bold">{{ classroom.title }}</h1>
                <div class="flex gap-2">
                    <Tag
                        icon="pi pi-comment"
                        severity="secondary"
                        :value="classroom.type"
                        rounded
                        class="border"
                    />
                    <Tag
                        icon="pi pi-desktop"
                        severity="secondary"
                        :value="classroom.format"
                        rounded
                        class="border"
                    />
                    <Tag
                        icon="pi pi-users"
                        severity="secondary"
                        :value="classroom.capacity.toString()"
                        rounded
                        class="border"
                    />
                </div>
                <div>
                    <p class="text-sm text-gray-500">Details</p>
                    <div v-html="classroom.details" />
                </div>
                <div>
                    <p class="text-sm text-gray-500">Target</p>
                    <div v-html="classroom.target" />
                </div>
                <div v-if="classroom.prerequisite">
                    <p class="text-sm text-gray-500">Prerequisites</p>
                    <div>{{ classroom?.prerequisite }}</div>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Date</p>
                    <div>
                        {{
                            classroom.date
                                .map((date) => new Date(date).toDateString())
                                .join(", ")
                        }}
                    </div>
                </div>
                <div>
                    <p class="text-sm text-gray-500">Location</p>
                    <div>{{ classroom.venue?.name || "TBA" }}</div>
                </div>
                <div class="flex justify-end gap-2">
                    <Button
                        icon="pi pi-arrow-up"
                        severity="info"
                        rounded
                        outlined
                        label="88"
                    />
                    <Button v-if="classroom.registrationUrl">Register</Button>
                </div>
            </div>
        </div>
    </div>
</template>
