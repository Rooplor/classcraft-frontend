<script setup lang="ts">
import {
    EVenueRequestStatus,
    type IClassroom,
} from "../../../../types/Classroom";

definePageMeta({
    layout: false,
});

const router = useRouter();
const { id } = router.currentRoute.value.params;
const { getClassroomById, updateVenueStatus } = useClassroom();

let classroom: IClassroom = {} as IClassroom;

try {
    classroom = (await getClassroomById(id.toString())).result;
    await updateVenueStatus(id.toString(), EVenueRequestStatus.APPROVED);
} catch (error) {
    router.replace("/404");
}

useHead({
    title: `Approve Venue Reservation ${classroom.title} · ClassCraft`,
});
</script>
<template>
    <div
        class="flex flex-col gap-8 items-center mt-20 w-full max-w-screen-md m-auto text-center"
    >
        <i class="pi pi-check-circle text-primary" style="font-size: 4.5rem" />
        <div class="flex flex-col gap-5">
            <h1 class="text-5xl font-bold">Approved</h1>
            <p class="text-3xl leading-10">
                Successfully reserve venue for
                <span class="font-semibold text-primary">{{
                    classroom.title
                }}</span
                >.
                <br />
                Classroom’s host is available to open registration now.
            </p>
        </div>
    </div>
</template>
