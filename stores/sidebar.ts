import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
    state: () => ({
        isSidebarOpen: true,
        isDrawerOpen: false,
    }),
    actions: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        toggleDrawer() {
            this.isDrawerOpen = !this.isDrawerOpen;
        },
        openDrawer() {
            this.isDrawerOpen = true;
        },
        closeDrawer() {
            this.isDrawerOpen = false;
        },
    },
});
