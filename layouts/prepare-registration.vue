<script setup lang="ts">
const registrationUrl = ref();
</script>

<template>
    <h2>Prepare for registration</h2>
    <div>
        <div class="p-4 bg-white border rounded-lg">
            <div>
                <h3>Use our registration form template</h3>
            </div>
            <div class="flex gap-2">
                <button class="w-32 aspect-square bg-gray-300 rounded-lg" />
                <button class="w-32 aspect-square bg-gray-300 rounded-lg" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="registrationUrl">Registration url</label>
                <div class="flex">
                    <InputText id="registrationUrl" v-model="registrationUrl" />
                    <Button label="Save" icon="pi pi-check" @click="" />
                </div>
            </div>
            <div class="flex justify-end w-full">
                <Button label="Save" icon="pi pi-check" @click="" />
                <Button
                    label="Open for registration"
                    icon="pi pi-check"
                    @click=""
                />
            </div>
        </div>
    </div>
</template>
