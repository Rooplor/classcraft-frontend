<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

const { addClassroom } = useClassroom();
const router = useRouter();

const schema = yup.object({
    title: yup.string().required(),
    details: yup.string().required(),
    target: yup.string().required(),
    prerequisite: yup.string(),
    type: yup.string().required(),
    format: yup.string().required(),
    capacity: yup.number().required(),
    date: yup.array().required(),
    // imageUrl: yup.string(),
});

const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: schema,
});

const [title] = defineField("title");
const [details] = defineField("details");
const [target] = defineField("target");
const [prerequisite] = defineField("prerequisite");
const [type] = defineField("type");
const [format] = defineField("format");
const [capacity] = defineField("capacity");
const [date] = defineField("date");
// const [imageUrl] = defineField("imageUrl");
const imageUrl = ref<string | null>(null);

const capacityOption = ref([
    { name: "10 คน", value: 10 },
    { name: "20 คน", value: 20 },
    { name: "30 คน", value: 30 },
    { name: "40 คน", value: 40 },
    { name: "50 คน", value: 50 },
]);

const formatOption = ref([
    { name: "Online", value: "ONLINE" },
    { name: "On-site", value: "ONSITE" },
    { name: "Mixed", value: "MIXED" },
]);

const typeOption = ref([
    { name: "Lecture", value: "LECTURE" },
    { name: "Workshop", value: "WORKSHOP" },
    { name: "Discussion", value: "DISCUSSION" },
]);

const onSubmit = handleSubmit((values: any) => {
    values.date = values.date.map((date: Date) => date.toISOString());
    addClassroom(values).then((res) => {
        router.push(`/class/${res.id}/edit`);
    });
    resetForm();
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

// TODO: fetch class details and filled to the form
</script>

<template>
    <div>
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
                    <label for="target">Class title</label>
                    <InputText
                        id="title"
                        v-model="title"
                        aria-describedby="title-help"
                        :class="{ 'p-invalid': errors.title }"
                    />
                    <VeeErrorMessage name="title" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="details">รายละเอียด</label>
                    <Editor
                        id="details"
                        v-model="details"
                        editorStyle="height: 320px"
                        :class="{ 'p-invalid': errors.details }"
                    />
                    <VeeErrorMessage name="details" class="text-red-500" />
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
                    <label for="type">ประเภทคลาสเรียน</label>
                    <SelectButton
                        v-model="type"
                        :options="typeOption"
                        optionLabel="name"
                        optionValue="value"
                        :invalid="errors.type"
                    />
                    <VeeErrorMessage name="type" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="format">รูปแบบการเรียน </label>
                    <SelectButton
                        v-model="format"
                        :options="formatOption"
                        optionLabel="name"
                        optionValue="value"
                        :invalid="errors.format"
                    />
                    <VeeErrorMessage name="format" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="capacity">จำนวนผู้เข้าร่วม </label>
                    <SelectButton
                        v-model="capacity"
                        :options="capacityOption"
                        optionLabel="name"
                        optionValue="value"
                        :invalid="errors.capacity"
                    />
                    <VeeErrorMessage name="capacity" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite">วันที่เรียน</label>
                    <DatePicker
                        v-model="date"
                        selectionMode="multiple"
                        :manualInput="false"
                        :invalid="errors.date"
                        showTime
                        hourFormat="24"
                    />
                    <VeeErrorMessage name="date" class="text-red-500" />
                </div>
                <div class="flex justify-end">
                    <Button label="Save" icon="pi pi-check" type="submit" />
                </div>
            </form>
        </div>
    </div>
</template>
