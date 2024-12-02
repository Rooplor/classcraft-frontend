<script setup lang="ts">
import type { IClassroom } from "../../../../types/Classroom";

definePageMeta({
    layout: false,
});

const router = useRouter();
const { id } = router.currentRoute.value.params;
const { getClassroomById } = useClassroom();

let classroom: IClassroom = {} as IClassroom;

try {
    classroom = (await getClassroomById(id.toString())).result;
} catch (error) {
    router.replace("/404");
}
</script>
<template>
    <div
        class="flex flex-col gap-8 items-center mt-20 w-full max-w-screen-md m-auto text-center"
    >
        <i class="pi pi-check-circle text-7xl text-primary" />
        <div class="flex flex-col gap-5">
            <h1 class="text-5xl font-bold">Approved</h1>
            <p class="text-3xl leading-10">
                Successfully reserve venue for
                <span class="font-semibold text-primary">{{ classroom.title }}</span
                >.
                <br />
                Classroom’s host is available to open registration now.
            </p>
        </div>
    </div>
</template>
