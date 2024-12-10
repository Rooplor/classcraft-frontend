<script setup lang="ts">
const { getAllClassroom, searchByTitleOrDetail } = useClassroom();
const { classroomFeedDisplay } = storeToRefs(useFeedDisplayStore());
let classrooms = ref();

const getClassroomFeed = async (feed: ClassroomFeedDisplay) => {
    switch (feed) {
        case ClassroomFeedDisplay.FOLLOWING:
            return (await getAllClassroom(true)).result;
        case ClassroomFeedDisplay.VOTING:
            return (await getAllClassroom(false)).result;
        case ClassroomFeedDisplay.EXPLORE:
            return (await getAllClassroom()).result;
    }
};

const search = ref("");
const value = ref("Upcoming");
const options = ref(["Upcoming", "Past"]);

classrooms.value = await getClassroomFeed(classroomFeedDisplay.value);

watch(
    classroomFeedDisplay,
    async (current, prev) => {
        if (prev !== current) {
            classrooms.value = await getClassroomFeed(current);
        }
    },
    { deep: true }
);
watch(search, async (current, prev) => {
    if (current === "") {
        classrooms.value = await getClassroomFeed(classroomFeedDisplay.value);
        return;
    }

    if (prev !== current) {
        classrooms.value = (await searchByTitleOrDetail(current)).result;
    }
});

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
        <Feedbar />
        <div class="w-full max-w-screen-lg mx-auto px-2">
            <div class="flex flex-col gap-4 pt-6 pb-[10px]">
                <div class="flex justify-between">
                    <SelectButton
                        v-model="value"
                        :options="options"
                        aria-labelledby="basic"
                    />
                    <div class="flex gap-2">
                        <div>
                            <InputGroup>
                                <InputGroupAddon>
                                    <i class="pi pi-search"></i>
                                </InputGroupAddon>
                                <InputText
                                    placeholder="Search classroom"
                                    v-model="search"
                                />
                            </InputGroup>
                        </div>
                        <nuxt-link to="class/new">
                            <Button label="Add class" icon="pi pi-plus" />
                        </nuxt-link>
                    </div>
                </div>
                <div class="space-y-[10px]">
                    <ClassroomItem
                        v-if="classrooms.length > 0"
                        v-for="(classroom, index) in classrooms"
                        :key="index"
                        :classroom="classroom"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* width */
::-webkit-scrollbar {
    height: 0px;
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #ccc;
}
</style>
