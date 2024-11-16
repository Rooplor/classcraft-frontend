<script setup lang="ts">
import type { IClassroom } from "../../../types/Classroom";
import type { IUser } from "../../../types/User";

const router = useRouter();
const { id } = router.currentRoute.value.params;
const { getClassroomById } = useClassroom();
const { getUserById } = useUser();

let classroom: IClassroom = {} as IClassroom;
let owner: IUser = {} as IUser;

try {
    classroom = (await getClassroomById(id.toString())).result;
    owner = (await getUserById(classroom.owner)).result;
} catch (error) {
    router.replace("/404");
}
</script>
<template>
    <div class="w-full max-w-screen-lg mx-auto px-2 flex flex-col gap-2">
        <Feedbar />
        <div class="flex gap-2 mb-3">
            <div>
                <div
                    v-if="classroom.coverImage"
                    class="w-[32rem] h-[32rem] aspect-square rounded-3xl overflow-clip"
                >
                    <Image preview>
                        <template #image>
                            <img
                                :src="classroom.coverImage"
                                :alt="`${classroom.title} class cover image`"
                                class="bg-gray-200 w-[32rem] h-[32rem] aspect-square border rounded-3xl object-cover"
                            />
                        </template>
                        <template #original="slotProps">
                            <img
                                :src="classroom.coverImage"
                                :alt="`${classroom.title} class cover image`"
                                :style="slotProps.style"
                                @click="slotProps.onClick"
                                class="w-[52rem] h-[52rem] aspect-square object-cover"
                            />
                        </template>
                    </Image>
                </div>
                <div
                    v-else
                    class="w-[32rem] h-[32rem] aspect-square bg-gray-200 border rounded-3xl flex justify-center items-center"
                >
                    <i class="pi pi-image text-[4rem] text-gray-400" />
                </div>
                <div class="group space-y-4 mt-6">
                    <p class="text-slate-500">Hosted by</p>
                    <nuxt-link
                        :to="`/user/${owner.id}`"
                        class="flex items-center gap-2"
                    >
                        <img
                            :src="owner.profilePicture"
                            :alt="`${owner.username} profile picture`"
                            class="w-8 h-8 rounded-full"
                        />
                        <p class="group-hover:text-gray-500 duration-150">
                            {{ owner.username }}
                        </p>
                    </nuxt-link>
                </div>
            </div>
            <div class="w-full space-y-8">
                <div
                    class="bg-white px-6 py-8 border rounded-3xl flex flex-col gap-10"
                >
                    <div>
                        <h1 class="text-4xl font-bold mb-4">
                            {{ classroom.title }}
                        </h1>
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
                    </div>
                    <div class="space-y-4">
                        <div class="inline-flex gap-3 space-y-2">
                            <div>
                                <i
                                    class="pi pi-calendar p-3 text-xl rounded-xl border bg-slate-100 text-slate-500"
                                />
                                <div
                                    class="border-r border-slate-300 w-1/2 h-full"
                                />
                            </div>
                            <div class="space-y-8">
                                <div
                                    v-for="(date, index) in classroom.date"
                                    :key="index"
                                >
                                    <p>
                                        {{
                                            new Date(date).toLocaleString(
                                                "en-GB",
                                                {
                                                    weekday: "short",
                                                    month: "long",
                                                    day: "numeric",
                                                }
                                            )
                                        }}
                                    </p>
                                    <p class="text-sm text-slate-500">
                                        {{
                                            new Date(date).toLocaleString(
                                                "en-GB",
                                                {
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                }
                                            )
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <i
                                class="pi pi-map-marker p-3 text-xl rounded-xl border bg-slate-100 text-slate-500"
                            />
                            <p>
                                {{ classroom?.venue?.room || "TBA" }}
                            </p>
                        </div>
                    </div>
                    <div class="mb-8">
                        <div v-html="classroom.details" />
                    </div>
                    <div>
                        <p class="text-gray-500">Made for</p>
                        <div v-html="classroom.target" />
                    </div>
                    <div v-if="classroom.prerequisite">
                        <p class="text-gray-500">Prerequisites</p>
                        <div>{{ classroom?.prerequisite }}</div>
                    </div>
                    <div class="flex justify-end gap-2">
                        <Button
                            v-if="!classroom.registrationStatus"
                            icon="pi pi-arrow-up"
                            severity="info"
                            rounded
                            outlined
                            label="88"
                        />
                        <NuxtLink
                            v-if="classroom?.registrationUrl"
                            target="blank"
                            :to="classroom?.registrationUrl"
                            class="w-full"
                        >
                            <Button size="large" class="w-full">
                                Join this class
                                <i class="pi pi-arrow-up-right" />
                            </Button>
                        </NuxtLink>
                    </div>
                </div>
                <div>
                    <p class="text-xl font-bold mb-4">Instructor</p>
                    <div
                        class="bg-white p-6 border rounded-3xl flex flex-col gap-4"
                    >
                        <div class="space-y-5">
                            <div class="flex gap-4">
                                <div
                                    class="w-32 h-32 aspect-square border rounded-full overflow-clip"
                                >
                                    <Image preview>
                                        <template #image>
                                            <img
                                                :src="
                                                    classroom.instructorAvatar
                                                "
                                                :alt="`${classroom.instructorName} profile image`"
                                                class="w-32 h-32 aspect-square border rounded-full object-cover"
                                            />
                                        </template>
                                        <template #original="slotProps">
                                            <img
                                                :src="
                                                    classroom.instructorAvatar
                                                "
                                                :alt="`${classroom.instructorName} profile image`"
                                                :style="slotProps.style"
                                                @click="slotProps.onClick"
                                                class="w-[52rem] h-[52rem] aspect-square object-cover"
                                            />
                                        </template>
                                    </Image>
                                </div>
                                <div>
                                    <p class="text-xl font-bold">
                                        {{ classroom.instructorName }}
                                    </p>
                                    <p>{{ classroom.instructorBio }}</p>
                                </div>
                            </div>
                            <div>
                                <p class="text-gray-500">
                                    Familiarity to the topic
                                </p>
                                <p>
                                    {{ classroom.instructorFamiliarity || "" }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
