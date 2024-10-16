<script setup lang="ts"></script>
<template>
    <div
        class="flex gap-6 bg-white border rounded-3xl p-5 duration-150 hover:drop-shadow-sm"
    >
        <div class="w-full flex flex-col gap-4">
            <h1 class="font-bold text-xl">Title</h1>
            <p class="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                laboriosam eveniet nihil doloribus? Quis dolores impedit officia
                animi voluptate recusandae odit enim, eius beatae id! Animi
                quaerat ab consequatur fugiat.
            </p>
            <div class="w-full flex justify-end gap-2">
                <Button
                    icon="pi pi-arrow-up"
                    severity="info"
                    rounded
                    outlined
                    label="88"
                />
                <Button @click.prevent=""> Register </Button>
            </div>
        </div>
    </div>
</template>
