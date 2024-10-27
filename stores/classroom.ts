import { defineStore } from "pinia";

export const useClassroomStore = defineStore("classroom", {
    state: () => ({
        feedClassrooms: [],
        myClassrooms: [],
        editingClassroom: null,
    }),
    actions: {
        setMyClassrooms(classrooms: any) {
            this.myClassrooms = classrooms;
        },
        setFeedClassrooms(classrooms: any) {
            this.feedClassrooms = classrooms;
        },
        addClassroom(classroom: any) {
            this.myClassrooms = [...this.myClassrooms, classroom];
        },
        updateClassroom(classroom: any) {
            const index = this.myClassrooms.findIndex(
                (c) => c.id === classroom.id
            );
            this.myClassrooms[index] = classroom;
        },
        removeClassroomById(id: string) {
            this.myClassrooms = this.myClassrooms.filter((c) => c.id !== id);
        },
        setEditingClassroom(classroom: any) {
            this.editingClassroom = classroom;
        },
        clearEditingClassroom() {
            this.editingClassroom = null;
        },
    },
});
