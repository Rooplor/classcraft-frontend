<script setup lang="ts">
import { SIT_BOOKING_WEBSITE } from "../constants/url";
import { mockVenues } from "../types/Venue";

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore);

const config = useRuntimeConfig();
const meetingUrl = ref();
const selectedVenues = ref<number[]>([]);
const dialogVisible = ref<Record<number, boolean>>({});

const handleSendRequest = () => {
    window.location.href = `mailto:${config.public.reservationEmailContact}
        ?subject=Venue reservation request
        &body=I would like to reserve the following venue(s):
        ${selectedVenues.value
            .map((id) => mockVenues.find((v) => v.id === id)?.room)
            .join(", ")}
        `;
};

const selectVenue = (id: number) => {
    const index = selectedVenues.value.indexOf(id);
    if (index === -1) {
        selectedVenues.value.push(id);
    } else {
        selectedVenues.value.splice(index, 1);
    }
};

const groupVenues = (venues) => {
    const grouped = {};
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

const groupedVenues = groupVenues(mockVenues);

mockVenues.forEach((venue) => {
    dialogVisible.value[venue.id] = false;
});
</script>

<template>
    <div class="space-y-[10px]">
        <nuxt-link
            :href="SIT_BOOKING_WEBSITE"
            target="_blank"
            class="block bg-gradient-to-l from-blue-200 to-teal-200 text-blue-500 text-xl font-medium p-6 rounded-xl border border-blue-500 duration-150 hover:text-blue-700 hover:border-blue-700 animate-scalein"
        >
            <p>
                Check available room at SIT Booking System
                <i class="pi pi-external-link" />
            </p>
        </nuxt-link>
        <div
            v-if="
                editingClassroom?.format === 'MIXED' ||
                editingClassroom?.format === 'ONSITE'
            "
            class="p-6 bg-white border rounded-3xl"
        >
            <div class="space-y-4">
                <div class="flex flex-col gap-16">
                    <div
                        v-for="(floors, building) in groupedVenues"
                        :key="building"
                        class="space-y-8"
                    >
                        <div class="space-y-2">
                            <h2 class="text-xl font-bold">{{ building }}</h2>
                            <p class="text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Aspernatur velit ipsam eius,
                                fugiat delectus perspiciatis a ratione est,
                                repellendus officia perferendis consectetur
                                cupiditate maiores praesentium dolores sapiente
                                magnam quos iste!
                            </p>
                        </div>
                        <div
                            v-for="(venues, floor) in floors"
                            :key="floor"
                            class="space-y-4"
                        >
                            <h3 class="text-lg text-gray-500">
                                Floor {{ floor }}
                            </h3>
                            <div class="grid grid-cols-3 gap-2">
                                <div v-for="venue in venues">
                                    <Card
                                        style="overflow: hidden"
                                        @click="selectVenue(venue.id)"
                                        class="cursor-pointer duration-100 hover:bg-gray-100 border"
                                        :class="
                                            selectedVenues.includes(venue.id)
                                                ? '!bg-blue-100 border-blue-500'
                                                : 'bg-white'
                                        "
                                    >
                                        <template #header>
                                            <img
                                                :alt="`image of ${venue.room} at ${venue.location.building} fl.${venue.location.floor}`"
                                                :src="venue.imageUrl"
                                                class="h-52 bg-gray-100 object-cover w-full"
                                            />
                                        </template>
                                        <template #title>{{
                                            venue.room
                                        }}</template>
                                        <template #subtitle>{{
                                            `${venue.location.building}, Floor ${venue.location.floor}`
                                        }}</template>
                                        <template #content>
                                            <p class="m-0 line-clamp-2">
                                                {{ venue.description }}
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
                                            dialogVisible[venue.id]
                                        "
                                        modal
                                        :header="venue.room"
                                        :style="{ width: '50rem' }"
                                        :breakpoints="{
                                            '1199px': '75vw',
                                            '575px': '90vw',
                                        }"
                                        pt:mask:class="backdrop-blur-sm"
                                    >
                                        <img
                                            :src="venue.imageUrl"
                                            :alt="`image of ${venue.room} at ${venue.location.building} fl.${venue.location.floor}`"
                                            class="h-[32rem] bg-gray-100 object-cover w-full rounded-xl"
                                        />
                                        <p>
                                            <strong>Location:</strong>
                                            {{ venue.location.building }}, Floor
                                            {{ venue.location.floor }}
                                        </p>
                                        <p>
                                            <strong>Capacity:</strong>
                                            {{ venue.capacity }}
                                        </p>

                                        <p>{{ venue.description }}</p>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-4 mt-1">
                    <Button
                        label="Send request"
                        icon="pi pi-send"
                        @click="handleSendRequest"
                    />
                </div>
            </div>
        </div>
        <div
            v-if="
                editingClassroom?.format === 'MIXED' ||
                editingClassroom?.format === 'ONLINE'
            "
            class="p-6 bg-white border rounded-3xl space-y-4"
        >
            <h3 class="text-lg">Online platform</h3>
            <div class="flex gap-1">
                <InputGroup>
                    <InputGroupAddon>
                        <i class="pi pi-link"></i>
                    </InputGroupAddon>
                    <InputText
                        id="meeting-url"
                        placeholder="eg. Zoom, Discord or Google Meet url"
                    />
                </InputGroup>
                <Button label="Save" icon="pi pi-check" @click="" />
            </div>
        </div>
    </div>
</template>
