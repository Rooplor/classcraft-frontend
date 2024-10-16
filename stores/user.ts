import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {
            id: "",
            username: "",
            email: "",
            profilePicture: "",
        },
    }),
    actions: {
        setUser(user: any) {
            this.user = user;
        },
    },
});
