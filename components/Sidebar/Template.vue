<script setup lang="ts">
import type { IClassroom } from "~/types/Classroom";

defineProps({
    closeCallback: {
        type: Function,
    },
});

const classroomStore = useClassroomStore();
const { classrooms } = storeToRefs(classroomStore) as {
    classrooms: Ref<IClassroom[]>;
};
const sidebarStore = useSidebarStore();
const { isSidebarOpen } = storeToRefs(sidebarStore) as {
    isSidebarOpen: Ref<boolean>;
};
</script>

<template>
    <div class="flex flex-col gap-9">
        <div
            class="flex gap-2"
            :class="isSidebarOpen ? 'justify-between' : 'justify-center'"
        >
            <nuxt-link
                v-if="isSidebarOpen"
                to="/"
                class="inline-flex items-center text-xl text-primary"
            >
                <img
                    src="/logo_text_primary.png"
                    alt="ClassCraft Logo"
                    class="h-8"
                />
            </nuxt-link>
            <Button
                :icon="isSidebarOpen ? 'pi pi-angle-left' : 'pi pi-angle-right'"
                severity="secondary"
                rounded
                aria-label="Toggle sidebar"
                @click="
                    closeCallback
                        ? closeCallback()
                        : sidebarStore.toggleSidebar()
                "
            />
        </div>
        <div>
            <SidebarTab
                to="/class"
                label="Home"
                icon="pi pi-home"
                :isSidebarOpen="isSidebarOpen"
                @click="closeCallback?.()"
            />
            <SidebarTab
                to="/class/following"
                label="Following"
                icon="pi pi-users"
                :isSidebarOpen="isSidebarOpen"
                @click="closeCallback?.()"
            />
            <SidebarTab
                to="/class/voting"
                label="Voting"
                icon="pi pi-arrow-up"
                :isSidebarOpen="isSidebarOpen"
                @click="closeCallback?.()"
            />
            <SidebarTab
                to="/discussion"
                label="Topic request"
                icon="pi pi-comments"
                :isSidebarOpen="isSidebarOpen"
                @click="closeCallback?.()"
            />
        </div>
        <div
            :class="{
                'flex flex-col items-center': !isSidebarOpen,
            }"
        >
            <Accordion
                multiple
                :value="['0', '1']"
                collapseIcon="pi pi-angle-up"
                expandIcon="pi pi-angle-down"
            >
                <AccordionPanel value="0" :pt="{ root: '!border-none' }">
                    <AccordionHeader
                        :pt="{ root: 'hover:!bg-slate-100 !rounded-xl !p-4' }"
                    >
                        <div v-if="isSidebarOpen" class="flex justify-between">
                            <p class="text-slate-500 text-sm font-medium">
                                YOUR CLASSROOMS
                            </p>
                        </div>
                    </AccordionHeader>
                    <AccordionContent unstyled>
                        <SidebarTab
                            to="/class/new/edit"
                            label="Create a classroom"
                            icon="pi pi-plus"
                            :isSidebarOpen="isSidebarOpen"
                            @click="closeCallback?.()"
                            class="text-primary"
                        />
                        <SidebarTab
                            v-for="classroom in classrooms"
                            :key="classroom?.id"
                            :to="`/class/${classroom?.id}/edit`"
                            :classroom="classroom"
                            :isCollapsed="isSidebarOpen"
                            @click="closeCallback?.()"
                        />
                    </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="1" :pt="{ root: '!border-none' }">
                    <AccordionHeader
                        :pt="{ root: 'hover:!bg-slate-100 !rounded-xl !p-4' }"
                    >
                        <div v-if="isSidebarOpen" class="flex justify-between">
                            <p class="text-slate-500 text-sm font-medium">
                                YOUR REQUESTS
                            </p>
                        </div>
                    </AccordionHeader>
                    <AccordionContent unstyled>
                        <SidebarTab
                            to="/class/new/edit"
                            label="Create a request"
                            icon="pi pi-plus"
                            :isSidebarOpen="isSidebarOpen"
                            @click="closeCallback?.()"
                            class="text-primary"
                        />
                        <SidebarTab
                            v-for="classroom in classrooms"
                            :key="classroom?.id"
                            :to="`/class/${classroom?.id}/edit`"
                            :classroom="classroom"
                            :isCollapsed="isSidebarOpen"
                            @click="closeCallback?.()"
                        />
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
</template>
