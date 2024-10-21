<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from "../stores/user";

const { addClassroom, updateClassroom } = useClassroom();
const router = useRouter();

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore);

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const toast = useToast();

const schema = yup.object({
    title: yup.string().required(),
    details: yup.string().required(),
    target: yup.string().required(),
    prerequisite: yup.string(),
    type: yup.string().required(),
    format: yup.string().required(),
    capacity: yup.number().required(),
    date: yup.array().of(yup.date().required()),    
    // dates: yup.array().of(
    //     yup
    //         .object({
    //             date: yup.date().required(),
    //             startTime: yup.date().required(),
    //             endTime: yup.date().required(),
    //         })
    //         .required()
    // ),
    instructorName: yup.string().required(),
    instructorBio: yup.string().required(),
    instructorAvatar: yup.string(),
    instructorFamiliarity: yup.string(),
    // imageUrl: yup.string(),
});

const initialValues = editingClassroom.value && {
    title: editingClassroom.value.title,
    details: editingClassroom.value.details,
    target: editingClassroom.value.target,
    prerequisite: editingClassroom.value.prerequisite,
    type: editingClassroom.value.type,
    format: editingClassroom.value.format,
    capacity: editingClassroom.value.capacity,
    date: editingClassroom.value.date,
    // dates: editingClassroom.value.dates.map((date) => ({
    //     date: new Date(date.date),
    //     startTime: new Date(date.startTime),
    //     endTime: new Date(date.endTime),
    // })),
    instructorName: editingClassroom.value.instructorName,
    instructorBio: editingClassroom.value.instructorBio,
    instructorAvatar: editingClassroom.value.instructorAvatar,
    instructorFamiliarity: editingClassroom.value.instructorFamiliarity,
    // imageUrl: editingClassroom.value.imageUrl,
};

const { defineField, handleSubmit, resetForm, errors } = useForm({
    initialValues,
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
const [instructorName] = defineField("instructorName");
const [instructorBio] = defineField("instructorBio");
const [instructorAvatar] = defineField("instructorAvatar");
const [instructorFamiliarity] = defineField("instructorFamiliarity");
// const [imageUrl] = defineField("imageUrl");
const imageUrl = ref<string | null>(null);

const selfInstructored = ref(false);

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
    if (editingClassroom.value) {
        updateClassroom(editingClassroom.value.id, values).then((res) => {
            if (res) {
                useClassroomStore().updateClassroom(res);
                toast.add({
                    severity: "success",
                    summary: "Class updated",
                    group: "tc",
                    life: 3000,
                });
            }
        });
        return;
    }
    addClassroom(values).then((res) => {
        if (res) {
            router.push(`/class/${res.id}/edit`);
            classroomStore.addClassroom(res);
            toast.add({
                severity: "success",
                summary: "Class created",
                group: "tc",
                life: 3000,
            });
        }
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

function initEditorValue({ instance }) {
    instance.setContents(
        instance.clipboard.convert({
            html: editingClassroom.value.details,
        })
    );
}

watch(selfInstructored, (value) => {
    if (value) {
        instructorName.value = user.value.username;
        instructorBio.value = user.value.email;
        instructorAvatar.value = user.value.profilePicture;
    } else {
        instructorName.value = "";
        instructorBio.value = "";
        instructorAvatar.value = "";
    }
});
</script>

<template>
    <div>
        <div>
            <form @submit="onSubmit" class="flex gap-2">
                <div
                    class="w-[32rem] h-[32rem] border aspect-square rounded-3xl overflow-clip sticky top-[10px]"
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
                <div class="flex flex-col gap-2">
                    <div
                        class="flex flex-col w-full gap-8 px-6 py-8 bg-white border rounded-3xl"
                    >
                        <div class="flex flex-col gap-2">
                            <label for="target">Title</label>
                            <InputText
                                id="title"
                                v-model="title"
                                aria-describedby="title-help"
                                :class="errors.title && 'p-invalid'"
                                placeholder="Enter class title"
                            />
                            <VeeErrorMessage
                                name="title"
                                class="text-red-500"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="details">Details</label>
                            <Editor
                                id="details"
                                v-model="details"
                                @load="initEditorValue"
                                editorStyle="height: 320px"
                                :class="errors.details && 'p-invalid'"
                            />
                            <VeeErrorMessage
                                name="details"
                                class="text-red-500"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="target">Target audience</label>
                            <Textarea
                                id="target"
                                v-model="target"
                                aria-describedby="target-help"
                                :class="errors.target && 'p-invalid'"
                                placeholder="Who should attend this class?"
                                rows="3"
                                style="resize: none"
                            />
                            <VeeErrorMessage
                                name="target"
                                class="text-red-500"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="prerequisite"
                                >Prerequisites (Optional)
                            </label>
                            <Textarea
                                id="prerequisite"
                                v-model="prerequisite"
                                aria-describedby="prerequisite-help"
                                placeholder="What should attendees know beforehand?"
                                rows="3"
                                style="resize: none"
                            />
                            <VeeErrorMessage
                                name="prerequisite"
                                class="text-red-500"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="type">Class type</label>
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
                            <label for="format">Class format</label>
                            <SelectButton
                                v-model="format"
                                :options="formatOption"
                                optionLabel="name"
                                optionValue="value"
                                :invalid="errors.format"
                            />
                            <VeeErrorMessage
                                name="format"
                                class="text-red-500"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="capacity">Available seats</label>
                            <InputNumber
                                v-model="capacity"
                                inputId="capacity"
                                :invalid="errors.capacity"
                                :min="1"
                                placeholder="How many people can attend?"
                            />
                            <VeeErrorMessage
                                name="capacity"
                                class="text-red-500"
                            />
                        </div>
                        <div class="space-y-2">
                            <DatePicker
                                v-model="date"
                                selectionMode="multiple"
                                :invalid="errors.date"
                                showIcon
                                iconDisplay="input"
                                fluid
                                showTime
                                hourFormat="24"
                                date-format="D d M yy"
                                showButtonBar
                                placeholder="Select date eg. Tue 22 Oct 2024"
                            />
                            <!-- <div
                                class="flex flex-col gap-6 border p-6 rounded-xl bg-gray-50"
                            >
                                <div class="flex flex-col gap-2">
                                    <label for="dates">Date</label>
                                    <DatePicker
                                        v-model="xxx"
                                        selectionMode="multiple"
                                        :invalid="errors.dates"
                                        showIcon
                                        iconDisplay="input"
                                        fluid
                                        hourFormat="24"
                                        date-format="D d M yy"
                                        showButtonBar
                                        placeholder="Select date eg. Tue 22 Oct 2024"
                                    />
                                    <VeeErrorMessage
                                        name="dates"
                                        class="text-red-500"
                                    />
                                </div>
                                <div class="flex gap-2">
                                    <div class="flex flex-col gap-2">
                                        <label for="startTime">From</label>
                                        <DatePicker
                                            v-model="yyy"
                                            selectionMode="single"
                                            :invalid="errors.startTime"
                                            timeOnly
                                            showIcon
                                            fluid
                                            iconDisplay="input"
                                            hourFormat="24"
                                            placeholder="Select start time"
                                        >
                                            <template #inputicon="slotProps">
                                                <i
                                                    class="pi pi-clock"
                                                    @click="
                                                        slotProps.clickCallback
                                                    "
                                                /> </template
                                        ></DatePicker>
                                        <VeeErrorMessage
                                            name="startTime"
                                            class="text-red-500"
                                        />
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for="endTime">To</label>
                                        <DatePicker
                                            v-model="zzz"
                                            selectionMode="single"
                                            :invalid="errors.endTime"
                                            timeOnly
                                            showIcon
                                            fluid
                                            iconDisplay="input"
                                            hourFormat="24"
                                            placeholder="Select end time"
                                        >
                                            <template #inputicon="slotProps">
                                                <i
                                                    class="pi pi-clock"
                                                    @click="
                                                        slotProps.clickCallback
                                                    "
                                                />
                                            </template>
                                        </DatePicker>
                                        <VeeErrorMessage
                                            name="endTime"
                                            class="text-red-500"
                                        />
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>

                    <div
                        class="flex flex-col w-full gap-8 px-6 py-8 bg-white border rounded-3xl"
                    >
                        <div class="flex items-center gap-2">
                            <Checkbox
                                inputId="selfInstructored"
                                v-model="selfInstructored"
                                binary
                            />
                            <label for="selfInstructored">
                                I'm the instructor
                            </label>
                        </div>
                        <div class="flex gap-6">
                            <div
                                class="w-52 h-52 border aspect-square rounded-full overflow-clip relative"
                            >
                                <div
                                    class="w-52 h-52 aspect-square bg-clip-border relative"
                                >
                                    <img
                                        v-if="instructorAvatar"
                                        :src="instructorAvatar"
                                        alt="Uploaded Image"
                                        class="object-cover w-full h-full"
                                    />
                                    <button
                                        v-else
                                        class="flex items-center justify-center w-full h-full bg-gray-200"
                                    >
                                        <span class="text-gray-400">
                                            <i
                                                class="pi pi-image text-[3rem]"
                                            />
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
                            <div class="space-y-4 w-full">
                                <div class="flex flex-col gap-2">
                                    <label for="instructorName">
                                        Instructor name
                                    </label>
                                    <InputText
                                        id="instructorName"
                                        v-model="instructorName"
                                        aria-describedby="instructorName-help"
                                        :class="
                                            errors.instructorName && 'p-invalid'
                                        "
                                        placeholder="Enter instructor name"
                                        :disabled="selfInstructored"
                                    />
                                    <VeeErrorMessage
                                        name="instructorName"
                                        class="text-red-500"
                                    />
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label for="instructorBio">Bio</label>
                                    <Textarea
                                        id="instructorBio"
                                        v-model="instructorBio"
                                        aria-describedby="instructorBio-help"
                                        :class="
                                            errors.instructorBio && 'p-invalid'
                                        "
                                        rows="3"
                                        style="resize: none"
                                        placeholder="Tell us about the instructor"
                                        :disabled="selfInstructored"
                                    />
                                    <VeeErrorMessage
                                        name="instructorBio"
                                        class="text-red-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="instructorFamiliarity"
                                >Familiarity to the topic</label
                            >
                            <Textarea
                                id="instructorFamiliarity"
                                v-model="instructorFamiliarity"
                                aria-describedby="instructorFamiliarity-help"
                                :class="
                                    errors.instructorFamiliarity && 'p-invalid'
                                "
                                rows="5"
                                style="resize: none"
                                placeholder="How familiar is the instructor with the topic?"
                            />
                            <VeeErrorMessage
                                name="instructorFamiliarity"
                                class="text-red-500"
                            />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <Button label="Save" icon="pi pi-check" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
