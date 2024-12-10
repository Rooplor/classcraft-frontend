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

const isOpen = ref("0");

onMounted(() => {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            isOpen.value = "1";
        }
    });
});

const status = computed(() => {
    if (!props.editingClassroom?.venueStatus) return;

    switch (props.editingClassroom.venueStatus) {
        case EVenueRequestStatus.NO_REQUEST:
            return {
                lable: "Select date for venue",
                icon: "pi pi-list",
                description: "Venues you select will show here",
                style: "border-slate-300 bg-white",
            };
        case EVenueRequestStatus.PENDING:
            return {
                lable: "Pending",
                icon: "pi pi-spinner-dotted animate-spin",
                description:
                    "Waiting for approval, please wait. This may take a while",
                style: "border-yellow-300 bg-yellow-50 text-yellow-600",
            };
        case EVenueRequestStatus.APPROVED:
            return {
                lable: "Approved",
                icon: "pi pi-check",
                description: "Venue has been approved",
                style: "border-green-300 bg-green-50 text-green-500",
            };
        case EVenueRequestStatus.REJECTED:
            return {
                lable: "Rejected",
                icon: "pi pi-times",
                description: "Venue has been rejected",
                style: "border-red-200 bg-red-50 text-red-500",
            };
    }
});
</script>

<template>
    <div
        class="block space-y-4 p-4 w-full rounded-2xl border duration-150"
        :class="status?.style"
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
            <div
                v-if="
                    editingClassroom?.venueStatus ===
                    EVenueRequestStatus.REJECTED
                "
                class="gap-2 mt-4 pl-2 border-l-2 border-red-500"
            >
                <p class="text-sm text-slate-500">Reject reason</p>
                <p class="text-red-500">
                    {{ editingClassroom.rejectReason }}
                </p>
            </div>
        </div>
        <Accordion
            :value="isOpen"
            :pt="{
                root: `!border !rounded-xl !shadow-none !p-0 ${
                    editingClassroom?.venueStatus >
                    EVenueRequestStatus.NO_REQUEST
                        ? editingClassroom?.venueStatus ===
                          EVenueRequestStatus.PENDING
                            ? '!bg-yellow-100 !border-yellow-300 text-yellow-600'
                            : editingClassroom?.venueStatus ===
                              EVenueRequestStatus.APPROVED
                            ? '!bg-green-100 !border-green-300 text-green-600'
                            : '!bg-red-100 !border-red-200 text-red-500'
                        : '!bg-slate-50'
                }`,
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
                        root: `!text-lg !font-semibold !rounded-xl !p-3 ${
                            editingClassroom?.venueStatus >
                            EVenueRequestStatus.NO_REQUEST
                                ? editingClassroom?.venueStatus ===
                                  EVenueRequestStatus.PENDING
                                    ? '!bg-yellow-100 !border-yellow-300 text-yellow-600'
                                    : editingClassroom?.venueStatus ===
                                      EVenueRequestStatus.APPROVED
                                    ? '!bg-green-100 !border-green-300 text-green-600'
                                    : '!bg-red-100 !border-red-500 text-red-500'
                                : '!bg-slate-50'
                        }`,
                    }"
                    >Selected venue</AccordionHeader
                >
                <AccordionContent unstyled class="!rounded-xl !shadow-none">
                    <div
                        class="grid grid-cols-2 text-nowrap flex-nowrap gap-2 overflow-x-scroll p-2 pt-0"
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
                                    ? status?.style
                                    : isSameVenue ||
                                      selectingDate === date.date.startDateTime
                                    ? 'border-primary-500 bg-primary-100 hover:bg-primary-200'
                                    : 'bg-white hover:bg-slate-100'
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
                                <p class="flex gap-1 text-sm text-slate-500">
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
                                    class="flex items-center gap-1 whitespace-nowrap p-2 bg-slate-100 border border-slate-300 rounded-md animate-fadein"
                                >
                                    <i class="pi pi-building" />
                                    {{
                                        venues.find(
                                            (venue: IVenue) => venue.id === id
                                        )?.room
                                    }}
                                </div>
                                <div v-else class="text-slate-400">
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
