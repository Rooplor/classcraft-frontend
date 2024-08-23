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

const onSubmit = handleSubmit((values: any) => {
    // TODO: send data to backend
    console.table("values: ", values);
});

// TODO: fetch class detail and filled to the form
</script>

<template>
    <div>
        <h2>Fill class detail</h2>
        <div class="flex">
            <div class="w-[32rem] aspect-square bg-red-300 rounded-lg"></div>
            <form
                @submit="onSubmit"
                class="p-4 bg-white border rounded-lg flex flex-col gap-4"
            >
                <div class="flex flex-col gap-2">
                    <label for="detail">รายละเอียด</label>
                    <InputText
                        id="detail"
                        v-model="detail"
                        aria-describedby="detail-help"
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
                    <label for="capacity">จำนวนผู้เรียน </label>
                    <SelectButton
                        v-model="capacity"
                        :options="[
                            '1-10 คน',
                            '11-20 คน',
                            '21-30 คน',
                            '31-50 คน',
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
