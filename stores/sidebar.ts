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
        openSidebar() {
            this.isSidebarOpen = true;
        },
        closeSidebar() {
            this.isSidebarOpen = false;
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
