<script setup lang="ts">
import { EVenueRequestStatus, type IClassroom } from "../types/Classroom";
import type { IVenue } from "../types/Venue";

const props = defineProps<{
    selectingDate: string;
    isSameVenue: boolean;
    editingClassroom: IClassroom;
    venues: IVenue[];
}>();

defineEmits<{
    (e: "setDate", date: string): void;
    (e: "toggleSameVenue"): void;
}>();

const cardStyle = computed(() => {
    if (!props.editingClassroom?.venueStatus) return;
    return {
        "border-gray-300 bg-white":
            props.editingClassroom.venueStatus ===
            EVenueRequestStatus.NO_REQUEST,
        "border-yellow-500 bg-yellow-200 text-yellow-600":
            props.editingClassroom.venueStatus === EVenueRequestStatus.PENDING,
        "border-green-500 bg-green-200 text-green-600":
            props.editingClassroom.venueStatus === EVenueRequestStatus.APPROVED,
        "border-red-500 bg-red-200 text-red-600":
            props.editingClassroom.venueStatus === EVenueRequestStatus.REJECTED,
    };
});

const itemStyle = computed(() => {
    if (!props.editingClassroom?.venueStatus) return;

    return {
        "border-gray-300 bg-white":
            props.editingClassroom.venueStatus ===
            EVenueRequestStatus.NO_REQUEST,
        "border-yellow-500 bg-yellow-100 text-yellow-600":
            props.editingClassroom.venueStatus === EVenueRequestStatus.PENDING,
        "border-green-500 bg-green-200 text-green-600":
            props.editingClassroom.venueStatus === EVenueRequestStatus.APPROVED,
        "border-red-500 bg-red-200 text-red-600":
            props.editingClassroom.venueStatus === EVenueRequestStatus.REJECTED,
    };
});

const status = computed(() => {
    if (!props.editingClassroom?.venueStatus) return;

    switch (props.editingClassroom.venueStatus) {
        case EVenueRequestStatus.NO_REQUEST:
            return {
                lable: "Select date for venue",
                icon: "pi pi-list",
                description: "Venues you select will show here",
            };
        case EVenueRequestStatus.PENDING:
            return {
                lable: "Pending",
                icon: "pi pi-spinner-dotted animate-spin",
                description: "Waiting for approval",
            };
        case EVenueRequestStatus.APPROVED:
            return {
                lable: "Approved",
                icon: "pi pi-check",
                description: "Venue has been approved",
            };
        case EVenueRequestStatus.REJECTED:
            return {
                lable: "Rejected",
                icon: "pi pi-times",
                description: "Venue has been rejected",
            };
    }
});
</script>

<template>
    <div
        class="block space-y-4 p-4 w-full rounded-2xl border duration-150"
        :class="cardStyle"
    >
        <div>
            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <i :class="status?.icon" />
                    <h3 class="text-xl font-medium">{{ status?.lable }}</h3>
                </div>
                <ToggleButton
                    v-if="
                        editingClassroom?.venueStatus ===
                        EVenueRequestStatus.NO_REQUEST
                    "
                    :modelValue="isSameVenue"
                    offLabel="Use same venue everyday"
                    onLabel="Select venue for each date"
                    @change="
                        $emit('toggleSameVenue');
                        editingClassroom?.dates.forEach((date) => {
                            date.venueId = [];
                        });
                    "
                />
            </div>
            <p class="text-gray-500">{{ status?.description }}</p>
        </div>
        <Accordion
            value="0"
            :pt="{
                root: '!border !rounded-xl !shadow-none !p-0 !bg-gray-50',
            }"
        >
            <AccordionPanel
                :pt="{
                    root: '!border-none !rounded-xl !shadow-none',
                }"
                value="0"
            >
                <AccordionHeader
                    :pt="{
                        root: '!text-lg !font-semibold !bg-transparent !p-4',
                    }"
                    >Selected venue</AccordionHeader
                >
                <AccordionContent
                    unstyled
                    class="!rounded-xl !shadow-none !bg-transparent"
                >
                    <div
                        class="grid grid-cols-2 text-nowrap flex-nowrap gap-2 overflow-x-scroll p-4 pt-0"
                    >
                        <button
                            @click="$emit('setDate', date.date.startDateTime)"
                            v-ripple
                            v-for="(date, index) in editingClassroom?.dates"
                            :key="index"
                            class="flex items-center p-3 border rounded-lg gap-8 duration-150 whitespace-nowrap overflow-scroll"
                            :class="
                                editingClassroom?.venueStatus.toString() >
                                EVenueRequestStatus.NO_REQUEST.toString()
                                    ? itemStyle
                                    : isSameVenue ||
                                      selectingDate === date.date.startDateTime
                                    ? 'border-primary-500 bg-primary-100 hover:bg-primary-200'
                                    : 'bg-white hover:bg-gray-100'
                            "
                        >
                            <div class="text-start basis-36 font-normal">
                                {{
                                    isoToDateWithTimezone(
                                        date.date.startDateTime
                                    ).toLocaleDateString("en-SG", {
                                        weekday: "short",
                                        month: "long",
                                        day: "numeric",
                                    })
                                }}
                                <p class="flex gap-1 text-sm text-gray-500">
                                    <i
                                        class="pi pi-clock text-sm mt-[0.2rem]"
                                    />
                                    {{
                                        isoToDateWithTimezone(
                                            date.date.startDateTime
                                        ).toLocaleTimeString("en-SG", {
                                            timeZone:
                                                Intl.DateTimeFormat().resolvedOptions()
                                                    .timeZone,
                                            hour: "numeric",
                                            minute: "numeric",
                                        })
                                    }}
                                    -
                                    {{
                                        isoToDateWithTimezone(
                                            date.date.endDateTime
                                        ).toLocaleTimeString("en-SG", {
                                            timeZone:
                                                Intl.DateTimeFormat().resolvedOptions()
                                                    .timeZone,
                                            hour: "numeric",
                                            minute: "numeric",
                                        })
                                    }}
                                </p>
                            </div>
                            <div class="flex w-full gap-1 overflow-x-scroll">
                                <div
                                    v-if="date.venueId.length > 0"
                                    v-for="(id, index) in date.venueId"
                                    :key="index"
                                    class="flex items-center gap-1 whitespace-nowrap p-2 bg-gray-100 border border-gray-300 rounded-md animate-fadein"
                                >
                                    <i class="pi pi-building" />
                                    {{
                                        venues.find(
                                            (venue: IVenue) => venue.id === id
                                        )?.room
                                    }}
                                </div>
                                <div v-else class="text-gray-400">
                                    No venue selected
                                </div>
                            </div>
                        </button>
                    </div>
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    </div>
</template>
