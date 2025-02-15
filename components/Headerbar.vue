<script setup lang="ts">
const menu = ref();

const emit = defineEmits(["search"]);

const items = ref([
  {
    label: "Classroom",
    icon: "pi pi-book",
    route: "/class/new/edit",
  },
  {
    label: "Request topic",
    icon: "pi pi-comment",
    route: "/class/new/edit",
  },
]);

const toggleMenu = (event: MouseEvent) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="sticky top-0 z-20 pb-2">
    <div
      class="flex gap-1 md:gap-2 justify-between items-center m-auto w-full"
    >
      <div class="md:hidden lg:block">
        <DrawerButton />
      </div>
      <div />
      <div class="flex gap-1 md:gap-2 items-center justify-center">
        <div class="hidden md:block">
          <Button
            label="Create"
            icon="pi pi-plus"
            rounded
            text
            size="small"
            @click="toggleMenu"
          />
        </div>
        <div class="md:hidden">
          <Button icon="pi pi-plus" size="small" text rounded @click="toggleMenu" />
        </div>
      </div>
    </div>
  </div>
  <Menu
    ref="menu"
    id="overlay_menu"
    :model="items"
    :popup="true"
    class="!rounded-xl p-1"
  >
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
    </template>
  </Menu>
</template>
