<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
    registrationUrl: yup.string().required(),
});

const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: schema,
});

const [registrationUrl] = defineField("registrationUrl");

const onSubmit = handleSubmit((values: any) => {
    // TODO: send data to backend
    console.table("values: ", values);
});
</script>

<template>
    <div>
        <form @submit="onSubmit" class="p-4 bg-white border rounded-3xl">
            <div>
                <h3>Use our registration form template</h3>
            </div>
            <div class="flex gap-2">
                <button class="w-32 aspect-square bg-gray-300 rounded-lg" />
                <button class="w-32 aspect-square bg-gray-300 rounded-lg" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="registrationUrl">Registration url</label>
                <div class="flex flex-col">
                    <InputText
                        id="registrationUrl"
                        v-model="registrationUrl"
                        :class="{ 'p-invalid': errors.registrationUrl }"
                    />
                    <VeeErrorMessage
                        name="registrationUrl"
                        class="text-red-500"
                    />
                </div>
            </div>
            <div class="flex justify-end w-full">
                <Button label="Save" icon="pi pi-check" @click="" />
                <Button
                    label="Open for registration"
                    icon="pi pi-check"
                    type="submit"
                />
            </div>
        </form>
    </div>
</template>
