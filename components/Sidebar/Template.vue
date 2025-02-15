<script setup lang="ts">
import type { IClassroom } from "../../types/Classroom";

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
const user = useCurrentUser();
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex flex-col gap-9 p-2">
      <div
        class="flex gap-2 h-full"
        :class="isSidebarOpen ? 'justify-between' : 'justify-center'"
      >
        <nuxt-link
          v-if="isSidebarOpen"
          to="/"
          class="inline-flex items-center text-xl text-primary"
        >
          <img src="/logo_text_primary.png" alt="ClassCraft Logo" class="h-8" />
        </nuxt-link>
      </div>
      <div>
        <SearchButton>
          <div
            class="w-full flex items-center justify-between gap-2 p-2 bg-slate-100 text-slate-500 hover:bg-slate-200 rounded-lg duration-200"
          >
            <p>
              <i class="pi pi-search" />
              Search
            </p>
            <span class="text-slate-400 text-sm"> Ctrl+K</span>
          </div>
        </SearchButton>
        <div class="mt-2">
          <SidebarTab
            to="/class"
            label="Home"
            icon="pi pi-home"
            :isSidebarOpen="isSidebarOpen"
            @click="closeCallback?.()"
          />
        </div>
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
              :pt="{ root: 'hover:!bg-slate-100 !rounded-lg !p-3' }"
            >
              <div v-if="isSidebarOpen" class="flex justify-between">
                <p class="text-slate-500 !text-sm font-medium">
                  Hosted classrooms
                </p>
              </div>
            </AccordionHeader>
            <AccordionContent unstyled>
               <SidebarTab
                to="/class/new/edit"
                label="Create a classroom"
                icon="pi pi-plus"
                :isSidebarOpen="isSidebarOpen"
                class="text-primary"
                @click="closeCallback?.()"
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
    <div class="sticky bottom-0">
      <ProfileButton>
        <div class="w-full flex items-center gap-3 p-2 py-3 border-t bg-white">
          <img
            :src="user?.photoURL || ''"
            :alt="user?.displayName!"
            class="w-10 h-10 rounded-full"
          />
          <div class="flex flex-col gap-2">
            <h2>{{ user?.displayName }}</h2>
          </div>
        </div>
      </ProfileButton>
    </div>
  </div>
</template>
