<script setup lang="ts">
const props = defineProps<{
  searchDialogOptions: {
    label: string;
    items: {
      icon?: string;
      image?: {
        src?: string;
        class: string;
      };
      label: string;
      onClick: () => void;
    }[];
  }[];
}>();

const selectedOption = ref(props.searchDialogOptions[0].items[0]);

window.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    selectedOption.value.onClick();
  }
});

watch(
  () => props.searchDialogOptions,
  () => {
    selectedOption.value = props.searchDialogOptions[0]?.items[0];
  }
);
</script>
<template>
  <div v-for="(option, index) in searchDialogOptions" :key="index">
    <p class="text-sm text-slate-500 my-2">
      {{ option.label }}
    </p>
    <div>
      <div
        v-for="(item, index) in option.items"
        :key="index"
        class="flex gap-3 items-center p-3 rounded-lg cursor-pointer"
        :class="{
          'bg-slate-100': selectedOption.onClick === item.onClick,
        }"
        @mouseenter="selectedOption = item"
        @click="item.onClick"
      >
        <i v-if="item.icon" :class="`${item.icon} w-6 text-center`" />
        <div v-if="item.image" class="flex gap-2 items-center">
          <img
            v-if="item.image.src"
            :src="item.image.src"
            :alt="item.label"
            :class="item.image.class"
          />
          <i
            v-else
            class="w-6 h-6 text-center bg-slate-200 text-slate-400 rounded"
            :style="`font-size: 0.8rem`"
          />
        </div>
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
