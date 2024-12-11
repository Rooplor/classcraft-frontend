<script setup lang="ts">
import { EVenueRequestStatus, type IClassroom } from "../../../types/Classroom";
import type { IUser } from "../../../types/User";
import type { IVenue } from "../../../types/Venue";

const router = useRouter();
const { id } = router.currentRoute.value.params;
const { getClassroomById } = useClassroom();
const { getVenueByIds } = useVenue();
const { getUserById } = useUser();

let classroom: IClassroom = {} as IClassroom;
let owner: IUser = {} as IUser;
let venues: IVenue[] = [];

try {
    classroom = (await getClassroomById(id.toString())).result;
    owner = (await getUserById(classroom.owner)).result;
    venues = (
        await getVenueByIds(
            classroom.dates
                .map((date) => date.venueId.map((id) => id.toString()))
                .flat()
        )
    ).result.filter((venue, index, self) => {
        return index === self.findIndex((t) => t.id === venue.id);
    });
} catch (error) {
    router.replace("/404");
}

useHead({
    title: `${classroom.title} · Classroom · ClassCraft`,
    meta: [
        {
            name: "description",
            content: `${classroom.title} class details.`,
        },
        {
            name: "keywords",
            content: `${classroom.title}, class, details`,
        },
    ],
});
</script>
<template>
    <div class="w-full flex flex-col">
        <Headerbar />
        <div
            class="flex flex-col gap-x-2 w-full mx-auto mb-3 lg:flex-row md:max-w-screen-lg"
        >
            <div class="mx-auto">
                <div
                    v-if="classroom.coverImage"
                    class="w-full h-full max-w-96 mb-2 max-h-96 m-auto aspect-square rounded-3xl overflow-clip"
                >
                    <Image :preview="classroom.coverImage ? true : false">
                        <template #image>
                            <img
                                :src="classroom.coverImage"
                                :alt="`${classroom.title} class cover image`"
                                class="bg-slate-200 w-full h-full max-w-96 max-h-96 aspect-square border rounded-3xl object-cover"
                            />
                        </template>
                        <template #original="slotProps">
                            <img
                                :src="classroom.coverImage"
                                :alt="`${classroom.title} class cover image`"
                                :style="slotProps.style"
                                @click="slotProps.previewCallback"
                                class="w-full h-full aspect-square object-cover md:w-[52rem] p-2"
                            />
                        </template>
                    </Image>
                </div>
                <div
                    v-else
                    class="hidden w-96 h-full max-h-96 m-auto aspect-square bg-slate-200 border rounded-3xl lg:flex justify-center items-center"
                >
                    <i class="pi pi-image text-[4rem] text-slate-400" />
                </div>
                <div class="group hidden space-y-2 mt-6 lg:block">
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
                        <p class="group-hover:text-primary duration-150">
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
                        <div class="mb-4">
                            <h1 class="text-4xl font-bold">
                                {{ classroom.title }}
                            </h1>
                            <div
                                class="group inline-flex items-center gap-2 mt-2 lg:hidden"
                            >
                                <nuxt-link
                                    :to="`/user/${owner.id}`"
                                    class="flex items-center gap-1"
                                >
                                    <img
                                        :src="owner.profilePicture"
                                        :alt="`${owner.username} profile picture`"
                                        class="w-5 h-5 rounded-full"
                                    />
                                    <p class="text-slate-500">Hosted by</p>
                                    <p
                                        class="group-hover:text-primary duration-150"
                                    >
                                        {{ owner.username }}
                                    </p>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="flex gap-2 flex-wrap">
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
                                    v-for="(date, index) in classroom.dates"
                                    :key="index"
                                >
                                    <p>
                                        {{
                                            isoToDateWithTimezone(
                                                date.date.startDateTime
                                            ).toLocaleString("en-GB", {
                                                weekday: "long",
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                        }}
                                    </p>
                                    <p class="text-sm text-slate-500">
                                        {{
                                            isoToDateWithTimezone(
                                                date.date.startDateTime
                                            ).toLocaleString("en-GB", {
                                                hour12: true,
                                                hour: "numeric",
                                                minute: "numeric",
                                            })
                                        }}
                                        -
                                        {{
                                            isoToDateWithTimezone(
                                                date.date.endDateTime
                                            ).toLocaleString("en-GB", {
                                                hour12: true,
                                                hour: "numeric",
                                                minute: "numeric",
                                            })
                                        }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <i
                                class="pi pi-map-marker p-3 text-xl rounded-xl border bg-slate-100 text-slate-500"
                            />
                            <div>
                                <div
                                    v-if="
                                        venues.length > 0 &&
                                        classroom.venueStatus ===
                                            EVenueRequestStatus.APPROVED
                                    "
                                >
                                    <p>
                                        {{ venues[0]?.room }},
                                        {{ venues[0]?.location?.building }}
                                        <span v-if="venues[0]?.location.floor">
                                            fl. {{ venues[0]?.location.floor }}
                                        </span>
                                        <span
                                            v-if="venues.length > 1"
                                            class="font-light italic"
                                        >
                                            and {{ venues.length - 1 }} more
                                        </span>
                                    </p>
                                </div>
                                <p v-else>TBA</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-8">
                        <div v-html="classroom.details" />
                    </div>
                    <div>
                        <p class="text-slate-500">Made for</p>
                        <div v-html="classroom.target" />
                    </div>
                    <div v-if="classroom.prerequisite">
                        <p class="text-slate-500">Prerequisites</p>
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
                            <Button size="large" class="w-full" rounded>
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
                            <div class="flex flex-col gap-4">
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
                                                @click="
                                                    slotProps.previewCallback
                                                "
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
                                <p class="text-slate-500">
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
