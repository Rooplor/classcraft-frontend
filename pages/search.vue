<script setup lang="ts">
const route = useRoute();
const search = route.query.q?.toString() || "";

const { searchByTitleOrDetail } = useClassroom();
const classrooms = ref((await searchByTitleOrDetail(search)).result);

const selectedOption = ref({ icon: "pi pi-book", label: "Classroom" });
const options = ref([
    { icon: "pi pi-book", label: "Classroom" },
    { icon: "pi pi-comment", label: "Request topic" },
    { icon: "pi pi-user", label: "User" },
]);

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
                        <div class="flex gap-2 w-full">
                            <button
                                v-for="option in options"
                                class="py-2 px-4 border rounded-full font-medium whitespace-nowrap duration-200"
                                :class="
                                    selectedOption === option
                                        ? 'bg-primary-100 text-primary'
                                        : 'bg-white text-slate-500 hover:bg-slate-200'
                                "
                                @click="selectedOption = option"
                            >
                                <i :class="option.icon" /> {{ option.label }}
                            </button>
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
