import { defineStore } from "pinia";

export const useClassroomStore = defineStore("user", {
    state: () => ({
        classrooms: [],
    }),
    actions: {
        setClassroom(classrooms:any) {
            this.classrooms = classrooms;
        },
        addClassroom(classroom:any) {
            this.classrooms = [...this.classrooms, classroom];
        }
    },
});