<script setup lang="ts">
import { type IClassroom } from "../../types/Classroom";

const { getAllClassroom } = useClassroom();
let classrooms = ref<IClassroom[]>();

const options = ref(["Upcoming", "Past"]);
const selectedOption = ref(options.value[0]);

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
      <div class="flex flex-col gap-4 pb-2">
        <div
          class="grid grid-cols-2 w-64 text-center gap-1 bg-slate-100 p-1 rounded-xl font-medium"
        >
          <div
            v-for="(option, index) in options"
            :key="index"
            class="py-1 px-3 rounded-lg cursor-pointer"
            :class="
              selectedOption === option
                ? 'bg-white border'
                : 'text-slate-500 hover:text-black duration-200'
            "
            @click="selectedOption = option"
          >
            {{ option }}
          </div>
        </div>
        <div class="space-y-2">
          <ClassroomListItem
            v-if="selectedOption === 'Upcoming'"
            v-for="(classroom, index) in classrooms?.filter(
              (classroom) =>
                new Date() <
                isoToDateWithTimezone(classroom.dates[0].date.startDateTime)
            )"
            :key="index"
            :classroom="classroom"
          />
          <ClassroomListItem
            v-else-if="selectedOption === 'Past'"
            v-for="classroom in classrooms?.filter(
              (classroom) =>
                new Date() >
                isoToDateWithTimezone(
                  classroom.dates[classroom.dates.length - 1].date.endDateTime
                )
            )"
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
