<script setup lang="ts">
import {
    EVenueRequestStatus,
    type IClassroom,
    type IReservationDateAndVenue,
} from "../types/Classroom";
import type { IVenue } from "../types/Venue";

const props = defineProps<{
    classroom: IClassroom;
}>();

let venues: IVenue[] = [];
const { getVenueByIds } = useVenue();

venues = (
    await getVenueByIds(
        props.classroom.dates
            .map((date) => date.venueId.map((id) => id.toString()))
            .flat()
    )
).result.filter((venue, index, self) => {
    return index === self.findIndex((t) => t.id === venue.id);
});

const formatDateRange = (dates: IReservationDateAndVenue[]) => {
    const locale = "en-GB";
    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
    };

    const sortedDates = dates.sort((a, b) => {
        return (
            new Date(a.date.startDateTime).getTime() -
            new Date(b.date.startDateTime).getTime()
        );
    });

    const firstDate = isoToDateWithTimezone(sortedDates[0].date.startDateTime);
    const lastDate = isoToDateWithTimezone(
        sortedDates[sortedDates.length - 1].date.endDateTime
    );

    if (firstDate.toDateString() === lastDate.toDateString()) {
        return firstDate.toLocaleDateString(locale, {
            weekday: "long",
            month: "short",
            day: "numeric",
        });
    }

    return `${firstDate.toLocaleDateString(
        locale,
        options
    )} - ${lastDate.toLocaleDateString(locale, options)}`;
};
</script>
<template>
    <nuxt-link
        :to="'/class/' + classroom.id"
        class="flex gap-3 bg-white border rounded-3xl p-3 duration-150 hover:bg-slate-100 hover:drop-shadow-sm animate-fadein md:gap-6"
        v-ripple
    >
        <div
            alt="class image"
            class="flex justify-center items-center aspect-square w-40 h-40 bg-slate-200 rounded-2xl overflow-clip lg:w-52 lg:h-52"
        >
            <img
                v-if="props.classroom.coverImage"
                :src="props.classroom.coverImage"
                alt="class image"
                class="w-full h-full object-cover"
            />
            <span class="text-slate-400" v-else>
                <i class="pi pi-image" style="font-size: 4rem" />
            </span>
        </div>
        <div class="w-full flex flex-col gap-8">
            <div class="flex flex-col gap-2 md:gap-4">
                <div class="space-y-2">
                    <h1 class="font-bold text-xl">
                        {{ props.classroom.title }}
                    </h1>
                    <div class="hidden md:flex gap-2 flex-wrap">
                        <Tag
                            icon="pi pi-comment"
                            severity="secondary"
                            :value="props.classroom.type"
                            rounded
                            class="border"
                        />
                        <Tag
                            icon="pi pi-desktop"
                            severity="secondary"
                            :value="props.classroom.format"
                            rounded
                            class="border"
                        />
                        <Tag
                            icon="pi pi-users"
                            severity="secondary"
                            :value="props.classroom.capacity.toString()"
                            rounded
                            class="border"
                        />
                    </div>
                </div>
                <div class="flex flex-col gap-2 text-slate-500">
                    <div class="flex items-center gap-1">
                        <i
                            class="pi pi-calendar p-2 rounded-lg border bg-slate-100"
                        />
                        <p>{{ formatDateRange(classroom.dates) }}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <i
                            class="pi pi-map-marker p-2 rounded-lg border bg-slate-100"
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
                <p class="text-slate-500 line-clamp-2">
                    <span v-html="props.classroom.details"></span>
                </p>
            </div>
        </div>
        <div>
            <Button
                icon="pi pi-star"
                rounded
                outlined
                label="88"
                size="small"
            />
        </div>
    </nuxt-link>
</template>
