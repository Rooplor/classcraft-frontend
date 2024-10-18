import { defineStore } from "pinia";

export const useClassroomStore = defineStore("classroom", {
    state: () => ({
        classrooms: [],
        editingClassroom: null,
    }),
    actions: {
        setClassrooms(classrooms: any) {
            this.classrooms = classrooms;
        },
        setEditingClassroom(classroom: any) {
            this.editingClassroom = classroom;
        },
        addClassroom(classroom: any) {
            this.classrooms = [...this.classrooms, classroom];
        },
        updateClassroom(classroom: any) {
            const index = this.classrooms.findIndex((c) => c.id === classroom.id);
            this.classrooms[index] = classroom;
        },
        removeClassroom(id: string) {
            this.classrooms = this.classrooms.filter((c) => c.id !== id);
        },
    },
});