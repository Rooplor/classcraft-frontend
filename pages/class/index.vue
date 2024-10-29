<script setup lang="ts">
const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore);

const value = ref("Upcoming");
const options = ref(["Upcoming", "Past"]);
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
<style>
* {
    font-family: Arial, Helvetica, sans-serif;
}
</style>
