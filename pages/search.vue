<script setup lang="ts">
const route = useRoute();
const search = route.query.q?.toString() || "";

const { searchByTitleOrDetail } = useClassroom();
const classrooms = ref((await searchByTitleOrDetail(search)).result);

const options = ref(["Classroom", "Topic request", "User"]);

const onSearch = async (keyword: string) => {
    try {
        classrooms.value = (await searchByTitleOrDetail(keyword)).result;
    } catch (error) {
        console.error("Error getting data:", error);
    }
};
</script>
<template>
    <div>
        <Headerbar :q="search" @search="onSearch" />
        <div class="w-full max-w-screen-lg mx-auto">
            <div class="flex flex-col gap-4 pb-[10px]">
                <div class="flex justify-between">
                    <div class="overflow-auto">
                        <div class="flex gap-2 w-96">
                            <Button
                                :label="option"
                                severity="secondary"
                                rounded
                                outlined
                                v-for="option in options"
                                class="whitespace-nowrap"
                            />
                        </div>
                    </div>
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
