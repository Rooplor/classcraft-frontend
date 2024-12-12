<script setup lang="ts">
const { getAllClassroom } = useClassroom();
let classrooms = ref();

const value = ref("Upcoming");
const options = ref(["Upcoming", "Past"]);

try {
    classrooms.value = (await getAllClassroom()).result;
} catch (error) {
    console.error("Error getting classrooms:", error);
}

useHead({
    title: "Classroom · ClassCraft",
    meta: [
        {
            name: "description",
            content: "Classroom page.",
        },
        {
            name: "keywords",
            content: "ClassCraft, Classroom",
        },
    ],
});
</script>

<template>
    <div class="w-full">
        <Headerbar />
        <div class="w-full max-w-screen-lg mx-auto">
            <div class="flex flex-col gap-4 pb-[10px]">
                <div class="flex justify-between">
                    <SelectButton
                        v-model="value"
                        :options="options"
                        aria-labelledby="basic"
                    />
                </div>
                <div class="space-y-[10px]">
                    <ClassroomListItem
                        v-for="(classroom, index) in classrooms"
                        :key="index"
                        :classroom="classroom"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
