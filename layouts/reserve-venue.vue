<script setup lang="ts">
import { SIT_BOOKING_WEBSITE } from "../constants/url";
import { EVenueRequestStatus, type IClassroom } from "../types/Classroom";
import { type IVenue } from "../types/Venue";

const { reserveVenue } = useClassroom();
const { getAllVenue } = useVenue();

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
    editingClassroom: Ref<IClassroom>;
};

const meetingUrl = ref();
const toast = useToast();
const confirm = useConfirm();

const selectingDate = ref<string>(
    editingClassroom.value?.dates[0].date.startDateTime
);
const venues = ref<IVenue[]>((await getAllVenue()).result || []);

const dialogVisible = ref<Record<string, boolean>>({});
const isSameVenue = ref(true);
const otherVenue = ref();
const isLoading = ref(false);

const handleSendRequest = async () => {
    let res = await reserveVenue(editingClassroom.value.id, editingClassroom.value.dates)
    
    if (res.success) {
        toast.add({
            severity: "success",
            summary: "Request sent",
            group: "tc",
            life: 3000,
        });
        editingClassroom.value.venueStatus =
            EVenueRequestStatus.PENDING;
        isLoading.value = false;
    } else {
        toast.add({
            severity: "error",
            summary: "Request failed",
            detail: res.error,
            group: "tc",
            life: 3000,
        });
    }

    isLoading.value = true;
};

const selectVenue = (id: string) => {
    if (
        editingClassroom.value.venueStatus === EVenueRequestStatus.PENDING ||
        editingClassroom.value.venueStatus === EVenueRequestStatus.APPROVED
    ) {
        return;
    }
    if (!selectingDate.value) {
        return;
    }

    const findDateIndex = (dateString: string) => {
        return editingClassroom.value.dates.findIndex(
            (date) => date.date.startDateTime === dateString
        );
    };

    const dateIndex = findDateIndex(selectingDate.value);

    if (dateIndex === -1) {
        return;
    }

    if (isSameVenue.value) {
        editingClassroom.value.dates.forEach((date) => {
            const venueIndex = date.venueId.indexOf(id);
            if (venueIndex !== -1) {
                date.venueId.splice(venueIndex, 1);
            } else {
                date.venueId.push(id);
            }
        });
    } else {
        const venueIndex =
            editingClassroom.value.dates[dateIndex].venueId.indexOf(id);
        if (venueIndex !== -1) {
            editingClassroom.value.dates[dateIndex].venueId.splice(
                venueIndex,
                1
            );
        } else {
            editingClassroom.value.dates[dateIndex].venueId.push(id);
        }
    }
};

const groupVenues = (venues: IVenue[]) => {
    const grouped = {} as Record<string, Record<string, IVenue[]>>;
    venues.forEach((venue) => {
        const { building, floor } = venue.location;
        if (!grouped[building]) {
            grouped[building] = {};
        }
        if (!grouped[building][floor]) {
            grouped[building][floor] = [];
        }
        grouped[building][floor].push(venue);
    });
    return grouped;
};

const confirmRequest = () => {
    confirm.require({
        message: `After sending the request, you will not be able to edit the venue for this class. Are you sure you want to proceed?`,
        header: "Are you sure you want to send request to reserve these venue?",
        icon: "pi pi-exclamation-triangle",
        rejectProps: {
            label: "Cancel",
            text: true,
        },
        acceptProps: {
            label: "Send request",
        },
        accept: () => {
            handleSendRequest();
        },
    });
};

const groupedVenues = computed(() => groupVenues(venues.value));

venues.value.forEach((venue) => {
    dialogVisible.value[venue.id] = false;
});
</script>

<template>
    <div
        v-if="isLoading"
        class="fixed top-0 left-0 w-full h-full bg-black/40 z-50"
    >
        <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
            <ProgressSpinner />
        </div>
    </div>
    <div class="space-y-8">
        <div class="space-y-2">
            <nuxt-link
                v-ripple
                :href="SIT_BOOKING_WEBSITE"
                target="_blank"
                class="block bg-primary-100 text-primary-500 text-xl font-medium p-6 rounded-xl border border-primary-500 duration-150 hover:bg-primary-200 animate-scalein"
            >
                <p>
                    Check available room at SIT Booking System
                    <i class="pi pi-external-link" />
                </p>
            </nuxt-link>
        </div>
        <div class="space-y-4 sticky top-[4.3rem] z-10">
            <VenueRequestStatusItem
                @setDate="selectingDate = $event"
                @toggleSameVenue="isSameVenue = !isSameVenue"
                :selectingDate="selectingDate"
                :editingClassroom="editingClassroom"
                :venues="venues"
                :isSameVenue="isSameVenue"
            />
        </div>
        <div
            v-if="
                editingClassroom?.venueStatus ===
                    EVenueRequestStatus.NO_REQUEST ||
                editingClassroom?.venueStatus === EVenueRequestStatus.REJECTED
            "
            class="space-y-4"
        >
            <p class="text-2xl font-semibold">Select venue</p>
            <div
                v-if="
                    editingClassroom?.format.toString() === 'MIXED' ||
                    editingClassroom?.format.toString() === 'ONSITE'
                "
                class="rounded-2xl bg-white p-2 border overflow-clip"
            >
                <div>
                    <div class="space-y-4">
                        <div class="flex flex-col gap-16">
                            <Accordion multiple :value="['0']">
                                <AccordionPanel
                                    v-for="(
                                        floors, building, index
                                    ) in groupedVenues"
                                    :value="index.toString()"
                                    :key="index"
                                >
                                    <AccordionHeader class="space-y-2">
                                        <h2 class="text-xl font-bold">
                                            <i class="pi pi-building" />
                                            {{ building }}
                                        </h2>
                                    </AccordionHeader>
                                    <AccordionContent>
                                        <p class="text-slate-500 mb-6">
                                            SIT Building, KMUTT, 126 Pracha
                                            Uthit 54, Bang Mot, Thung Khru,
                                            Bangkok 10140
                                        </p>
                                        <div
                                            v-for="(venues, floor) in floors"
                                            :key="floor"
                                            class="space-y-4"
                                        >
                                            <h3 class="text-lg text-slate-500">
                                                Floor {{ floor }}
                                            </h3>
                                            <div
                                                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
                                            >
                                                <div v-for="venue in venues">
                                                    <Card
                                                        style="overflow: hidden"
                                                        @click="
                                                            selectVenue(
                                                                venue.id
                                                            )
                                                        "
                                                        class="cursor-pointer duration-100 hover:bg-slate-100 border"
                                                        :class="
                                                            selectingDate &&
                                                            editingClassroom?.dates
                                                                .find(
                                                                    (d) =>
                                                                        d.date
                                                                            .startDateTime ==
                                                                        selectingDate
                                                                )
                                                                ?.venueId?.includes(
                                                                    venue?.id
                                                                )
                                                                ? 'border-primary-500 !bg-primary-100'
                                                                : ''
                                                        "
                                                    >
                                                        <template #header>
                                                            <img
                                                                :alt="`image of ${venue.room} at ${venue.location.building} fl.${venue.location.floor}`"
                                                                :src="
                                                                    venue.imageUrl
                                                                "
                                                                class="h-52 bg-slate-100 object-cover w-full"
                                                            />
                                                        </template>
                                                        <template #title>{{
                                                            venue.room
                                                        }}</template>
                                                        <template #subtitle>
                                                            <i
                                                                class="pi pi-map-marker"
                                                            />
                                                            {{
                                                                `${venue.location.building}, Floor ${venue.location.floor}`
                                                            }}
                                                        </template>
                                                        <template #content>
                                                            <p
                                                                class="m-0 line-clamp-2"
                                                            >
                                                                {{
                                                                    venue.description
                                                                }}
                                                            </p>
                                                        </template>
                                                        <template #footer>
                                                            <div
                                                                class="flex justify-end gap-4 mt-1"
                                                            >
                                                                <Button
                                                                    @click.stop="
                                                                        dialogVisible[
                                                                            venue.id
                                                                        ] = true
                                                                    "
                                                                    label="Read details"
                                                                    severity="secondary"
                                                                />
                                                            </div>
                                                        </template>
                                                    </Card>
                                                    <Dialog
                                                        v-model:visible="
                                                            dialogVisible[
                                                                venue.id
                                                            ]
                                                        "
                                                        modal
                                                        :header="venue.room"
                                                        :style="{
                                                            width: '50rem',
                                                        }"
                                                        :breakpoints="{
                                                            '1199px': '75vw',
                                                            '575px': '90vw',
                                                        }"
                                                        pt:mask:class="backdrop-blur-sm"
                                                        class="rounded-lg shadow-lg"
                                                    >
                                                        <div
                                                            class="flex flex-col items-center gap-4"
                                                        >
                                                            <img
                                                                :src="
                                                                    venue.imageUrl
                                                                "
                                                                :alt="`Image of ${venue.room} at ${venue.location.building}, Floor ${venue.location.floor}`"
                                                                class="h-80 bg-slate-100 object-cover w-full rounded-lg"
                                                            />
                                                            <div
                                                                class="text-slate-700 w-full space-y-3"
                                                            >
                                                                <p
                                                                    class="text-lg font-medium"
                                                                >
                                                                    <span
                                                                        class="font-semibold text-slate-900"
                                                                        >Location:</span
                                                                    >
                                                                    {{
                                                                        venue
                                                                            .location
                                                                            .building
                                                                    }}, Floor
                                                                    {{
                                                                        venue
                                                                            .location
                                                                            .floor
                                                                    }}
                                                                </p>
                                                                <p
                                                                    class="text-lg font-medium"
                                                                >
                                                                    <span
                                                                        class="font-semibold text-slate-900"
                                                                        >Capacity:</span
                                                                    >
                                                                    {{
                                                                        venue.capacity
                                                                    }}
                                                                </p>
                                                                <p
                                                                    class="text-md"
                                                                >
                                                                    {{
                                                                        venue.description
                                                                    }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionPanel>
                            </Accordion>
                        </div>
                        <div class="flex justify-end gap-4 mt-1">
                            <Button
                                label="Request to reserve"
                                icon="pi pi-send"
                                :disabled="
                                    !editingClassroom?.dates.every(
                                        (date) => date.venueId.length > 0
                                    )
                                "
                                @click="confirmRequest"
                            />
                        </div>
                        <div>
                            <p>Other Venue</p>

                            <div class="flex gap-1">
                                <InputGroup>
                                    <InputGroupAddon>
                                        <i class="pi pi-map-marker" />
                                    </InputGroupAddon>
                                    <InputText
                                        id="other-venue"
                                        v-model="otherVenue"
                                        placeholder="eg. SIT@Dover, SIT@NYP"
                                    />
                                </InputGroup>
                                <Button
                                    label="Save"
                                    icon="pi pi-check"
                                    @click=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="
                    editingClassroom?.format.toString() === 'MIXED' ||
                    editingClassroom?.format.toString() === 'ONLINE'
                "
                class="p-6 bg-white border rounded-3xl space-y-4"
            >
                <h3 class="text-lg">Online platform</h3>
                <div class="flex gap-1">
                    <InputGroup>
                        <InputGroupAddon>
                            <i class="pi pi-link" />
                        </InputGroupAddon>
                        <InputText
                            id="meeting-url"
                            v-model="meetingUrl"
                            placeholder="eg. Zoom, Discord or Google Meet url"
                        />
                    </InputGroup>
                    <Button label="Save" icon="pi pi-check" @click="" />
                </div>
            </div>
        </div>
    </div>
</template>
