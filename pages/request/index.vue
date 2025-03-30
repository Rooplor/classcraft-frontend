<script setup lang="ts">

</script>
<template>
  <div class="w-full">
    <Headerbar />
    <div class="w-full max-w-screen-lg mx-auto">
      <div class="flex flex-col gap-4 pb-2 pt-8">
        <div class="flex flex-col sm:flex-row justify-between gap-4">
          <h1 class="text-3xl font-bold">Requests</h1>
          <div
            class="grid grid-cols-2 w-full sm:w-64 text-center gap-1 bg-slate-100 rounded-xl font-medium p-1"
          >
            <!-- <div
              v-for="(option, index) in options"
              :key="index"
              class="py-1 px-3 rounded-lg cursor-pointer"
              :class="
                selectedOption === option
                  ? 'bg-white border'
                  : 'text-slate-500 hover:text-black duration-200'
              "
              @click="selectedOption = option"
            >
              {{ option }}
            </div> -->
          </div>
        </div>
        <div class="space-y-2">
          <!-- <ClassroomListItem
            v-for="(classroom, index) in filteredClassrooms"
            :key="index"
            :classroom="classroom"
          />
          <div
            v-if="filteredClassrooms?.length === 0"
            class="flex flex-col items-center gap-4 h-96 justify-center"
          >
            <p class="text-slate-400">No classrooms found. Let's create one</p>
            <nuxt-link to="/class/new">
              <Button
                label="Create a Classroom"
                severity="secondary"
                icon="pi pi-plus"
              />
            </nuxt-link>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
