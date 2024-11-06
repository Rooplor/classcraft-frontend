<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";

const props = defineProps<{
    classroom: IClassroom;
}>();

const formatDateRange = (dates: Date[]): string => {
    const formattedDates = dates
        .map((date) =>
            new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })
        )
        .sort();
    return `${formattedDates[0]} - ${
        formattedDates[formattedDates.length - 1]
    }`;
};
</script>
<template>
    <nuxt-link
        :to="'/class/' + classroom.id"
        class="flex gap-6 bg-white border rounded-3xl p-3 duration-150 hover:bg-gray-100 hover:drop-shadow-sm"
    >
        <div
            alt="class image"
            class="flex justify-center items-center aspect-square w-64 h-64 bg-gray-200 rounded-2xl overflow-clip"
        >
            <img
                v-if="props.classroom.coverImage"
                :src="props.classroom.coverImage"
                alt="class image"
                class="w-full h-full object-cover"
            />
            <span class="text-gray-400" v-else>
                <i class="pi pi-image text-[4rem]" />
            </span>
        </div>
        <div class="w-full flex flex-col gap-8">
            <div class="flex flex-col gap-4">
                <div>
                    <h1 class="font-bold text-xl mb-2">
                        {{ props.classroom.title }}
                    </h1>
                    <div class="flex gap-2">
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
                    <p>
                        <i
                            class="pi pi-calendar p-2 rounded-lg border bg-slate-100"
                        />
                        {{ formatDateRange(classroom?.date) }}
                    </p>
                    <p>
                        <i
                            class="pi pi-map-marker p-2 rounded-lg border bg-slate-100"
                        />
                        {{ props.classroom.venue?.room || "TBA" }}
                    </p>
                </div>
                <p class="text-gray-500 line-clamp-2">
                    <span v-html="props.classroom.details"></span>
                </p>
            </div>
            <div class="flex justify-between">
                <div class="flex items-center gap-2">
                    <AvatarGroup>
                        <Avatar
                            image="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728777600&semt=ais_hybrid-rr-similar"
                            shape="circle"
                        />
                        <Avatar
                            image="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728777600&semt=ais_hybrid-rr-similar"
                            shape="circle"
                        />
                        <Avatar
                            image="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728777600&semt=ais_hybrid-rr-similar"
                            shape="circle"
                        />
                        <Avatar
                            image="https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436190.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728777600&semt=ais_hybrid-rr-similar"
                            shape="circle"
                        />
                        <Avatar label="+10" shape="circle" />
                    </AvatarGroup>
                    <p class="font-bold">14 people registered</p>
                </div>
                <div class="flex gap-2">
                    <Button icon="pi pi-arrow-up" rounded outlined label="88" />
                    <Button
                        @click.prevent="
                            // open registration url in new tab
                            window.open(
                                props.classroom.registrationUrl,
                                '_blank'
                            )
                        "
                        v-if="props.classroom.registrationStatus"
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    </nuxt-link>
</template>
