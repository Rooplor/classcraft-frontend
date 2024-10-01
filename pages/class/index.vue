<script setup>
import { useClassroomStore } from "../../stores/classroom";

const classroomStore = useClassroomStore();
const { getAllClassroom } = useClassroom();

const classes = ref([]);

const getClassroom = async () => {
    classes.value = await getAllClassroom();
    classroomStore.setClassroom(classes.value);
};
</script>

<template>
    <div>
        <p>Classroom: {{ classroomStore.classroom }}</p>

        <button @click="getClassroom">Get Classroom</button>
    </div>
</template>
