<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
    detail: yup.string().required(),
    target: yup.string().required(),
    prerequisite: yup.string(),
    classType: yup.string().required(),
    format: yup.string().required(),
    capacity: yup.string().required(),
    dates: yup.array().required(),
    imageUrl: yup.string(),
});

const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: schema,
});

const [detail] = defineField("detail");
const [target] = defineField("target");
const [prerequisite] = defineField("prerequisite");
const [classType] = defineField("classType");
const [format] = defineField("format");
const [capacity] = defineField("capacity");
const [dates] = defineField("dates");
const [imageUrl] = defineField("imageUrl");

const onSubmit = handleSubmit((values: any) => {
    // TODO: send data to backend
    console.table("values: ", values);
});

const onFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            imageUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const removeImage = () => {
    imageUrl.value = null;
};

// TODO: fetch class detail and filled to the form
</script>

<template>
    <div>
        <!-- <h2>Fill class detail</h2> -->
        <div class="flex gap-4">
            <div
                class="w-[32rem] h-[32rem] border aspect-square rounded-3xl overflow-clip relative"
            >
                <div
                    class="w-[32rem] h-[32rem] aspect-square bg-clip-border relative"
                >
                    <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        alt="Uploaded Image"
                        class="object-cover w-full h-full"
                    />
                    <button
                        v-else
                        class="flex items-center justify-center w-full h-full bg-gray-200"
                    >
                        <span class="text-gray-400">
                            <i class="pi pi-image text-[4rem]" />
                        </span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        class="absolute inset-0 opacity-0 cursor-pointer"
                        @change="onFileChange"
                    />
                    <div class="absolute top-2 right-2">
                        <Button
                            v-if="imageUrl"
                            icon="pi pi-times"
                            severity="danger"
                            text
                            rounded
                            aria-label="Cancel"
                            @click="removeImage"
                        />
                    </div>
                </div>
            </div>
            <form
                @submit="onSubmit"
                class="flex flex-col w-full gap-8 px-6 py-8 bg-white border rounded-3xl"
            >
                <div class="flex flex-col gap-2">
                    <label for="detail">รายละเอียด</label>
                    <Editor
                        id="detail"
                        v-model="detail"
                        editorStyle="height: 320px"
                        :class="{ 'p-invalid': errors.detail }"
                    />
                    <VeeErrorMessage name="detail" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="target">เหมาะกับใคร</label>
                    <InputText
                        id="target"
                        v-model="target"
                        aria-describedby="target-help"
                        :class="{ 'p-invalid': errors.target }"
                    />
                    <VeeErrorMessage name="target" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite"
                        >พื้นฐานที่ต้องการสำหรับผู้เรียน (Optional)
                    </label>
                    <InputText id="prerequisite" v-model="prerequisite" />
                    <VeeErrorMessage name="prerequisite" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="classType">ประเภทคลาสเรียน</label>
                    <SelectButton
                        v-model="classType"
                        :options="['Lecture', 'Workshop', 'Discussion']"
                        :invalid="errors.classType"
                    />
                    <VeeErrorMessage name="classType" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="format">รูปแบบการเรียน </label>
                    <SelectButton
                        v-model="format"
                        :options="['Online', 'On-site', 'Hybrid']"
                        :invalid="errors.format"
                    />
                    <VeeErrorMessage name="format" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="capacity">จำนวนผู้เข้าร่วม </label>
                    <SelectButton
                        v-model="capacity"
                        :options="[
                            '10 คน',
                            '20 คน',
                            '30 คน',
                            '50 คน',
                            'มากกว่า 50 คน',
                        ]"
                        :invalid="errors.capacity"
                    />
                    <VeeErrorMessage name="capacity" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite">วันที่เรียน</label>
                    <DatePicker
                        v-model="dates"
                        selectionMode="multiple"
                        :manualInput="false"
                        :invalid="errors.dates"
                        showTime
                        hourFormat="24"
                    />
                    <VeeErrorMessage name="dates" class="text-red-500" />
                </div>
                <div class="flex justify-end">
                    <Button label="Save" icon="pi pi-check" type="submit" />
                </div>
            </form>
        </div>
    </div>
</template>
