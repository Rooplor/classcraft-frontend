<script setup lang="ts">
import {
    EVenueRequestStatus,
    type IClassroom,
} from "../../../../types/Classroom";

definePageMeta({
    layout: false,
});

const toast = useToast();
const router = useRouter();
const { id } = router.currentRoute.value.params;
const { getClassroomById, updateVenueStatus } = useClassroom();

let classroom: IClassroom = {} as IClassroom;

let rejectReason = ref("");

const onSubmit = async (e: Event) => {
    e.preventDefault();
    try {
        await updateVenueStatus(
            id.toString(),
            EVenueRequestStatus.REJECTED,
            rejectReason.value
        );
        window.close();
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Could not reject venue reservation",
            detail:
                "There was an error rejecting the venue reservation. Please try again later.",
            life: 3000,
            group: "tc",
        });
    }
};

try {
    classroom = (await getClassroomById(id.toString())).result;
} catch (error) {
    router.replace("/404");
}

useHead({
    title: `Reject Venue Reservation ${classroom.title} · ClassCraft`,
});
</script>
<template>
    <div
        class="flex flex-col gap-8 items-center mt-20 w-full max-w-screen-md m-auto text-center"
    >
        <i
            class="pi pi-spinner-dotted animate-spin animate-duration-3000 text-slate-500"
            style="font-size: 4.5rem"
        />
        <div class="flex flex-col gap-5 w-full">
            <h1 class="text-5xl font-bold">Reasons of rejection</h1>
            <p class="text-3xl leading-10">
                Please provide the reasons why
                <span class="font-bold text-primary">{{
                    classroom.title
                }}</span>
                is unable to reserve these venue.
            </p>
            <form
                @submit="onSubmit"
                class="flex flex-col gap-3 items-end w-full"
            >
                <Textarea
                    v-model="rejectReason"
                    :placeholder="`Why ${classroom.title} is unable to reserve these venue`"
                    rows="5"
                    fluid
                    style="resize: none"
                    required
                />
                <div>
                    <Button type="submit">Confirm rejection</Button>
                </div>
            </form>
        </div>
    </div>
</template>
