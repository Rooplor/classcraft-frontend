<script setup lang="ts">
const { getAllClassroom } = useClassroom();
const { classroomFeedDisplay } = storeToRefs(useFeedDisplayStore());
let classrooms = ref();

const getClassroomFeed = async (feed: ClassroomFeedDisplay) => {
    switch (feed) {
        case ClassroomFeedDisplay.FOLLOWING:
            classrooms.value = (await getAllClassroom(true)).result;
            break;
        case ClassroomFeedDisplay.VOTING:
            classrooms.value = (await getAllClassroom(false)).result;
            break;
        case ClassroomFeedDisplay.EXPLORE:
            classrooms.value = (await getAllClassroom()).result;
            break;
    }
};

const value = ref("Upcoming");
const options = ref(["Upcoming", "Past"]);

getClassroomFeed(classroomFeedDisplay.value);

watch(
    classroomFeedDisplay,
    async (current, prev) => {
        if (prev !== current) {
            getClassroomFeed(current);
        }
    },
    { deep: true }
);
</script>

<template>
    <div class="w-full px-[10px]">
        <Feedbar />
        <div class="flex flex-col gap-4 pt-6 pb-[10px]">
            <div class="flex justify-between">
                <SelectButton
                    v-model="value"
                    :options="options"
                    aria-labelledby="basic"
                />
                <nuxt-link to="class/new">
                    <Button>
                        <p><i class="pi pi-plus" /> Add class</p>
                    </Button>
                </nuxt-link>
            </div>
            <div class="space-y-[10px]">
                <ClassroomItem
                    v-for="(classroom, index) in classrooms"
                    :key="index"
                    :classroom="classroom"
                />
            </div>
        </div>
    </div>
</template>
