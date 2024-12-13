<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { EFileType } from "../types/File";
import type { EditorLoadEvent } from "primevue/editor";
import type { IClassroom } from "../types/Classroom";

const { addClassroom, updateClassroom } = useClassroom();
const router = useRouter();

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
    editingClassroom: Ref<IClassroom | null>;
};

const { uploadFile } = useFileUpload();

const user = useCurrentUser();

const toast = useToast();

const schema = yup.object({
    title: yup.string().required(),
    details: yup.string().required(),
    target: yup.string().required(),
    prerequisite: yup.string(),
    type: yup.string().required(),
    format: yup.string().required(),
    capacity: yup.number().required(),
    dates: yup.array().of(
        yup
            .object({
                date: yup.object({
                    startDateTime: yup.date().required("Fill the empty date"),
                    endDateTime: yup
                        .date()
                        .required("End time is required")
                        .min(
                            yup.ref("startDateTime"),
                            "End time must be after start time"
                        ),
                }),
                venueId: yup.array().of(yup.string()),
            })
            .required()
    ),
    instructorName: yup.string().required(),
    instructorBio: yup.string().required(),
    instructorAvatar: yup.string(),
    instructorFamiliarity: yup.string().required(),
    coverImage: yup.string(),
});

const initialValues = editingClassroom.value
    ? {
          title: editingClassroom.value.title,
          details: editingClassroom.value.details,
          target: editingClassroom.value.target,
          prerequisite: editingClassroom.value.prerequisite,
          type: editingClassroom.value.type,
          format: editingClassroom.value.format,
          capacity: editingClassroom.value.capacity,
          dates: editingClassroom.value.dates?.map((date: any) => ({
              date: {
                  startDateTime: isoToDateWithTimezone(date.date.startDateTime),
                  endDateTime: isoToDateWithTimezone(date.date.endDateTime),
              },
              venueId: date.venueId,
          })),
          instructorName: editingClassroom.value.instructorName,
          instructorBio: editingClassroom.value.instructorBio,
          instructorAvatar: editingClassroom.value.instructorAvatar,
          instructorFamiliarity: editingClassroom.value.instructorFamiliarity,
          coverImage: editingClassroom.value.coverImage,
      }
    : {
          dates: [
              {
                  date: { startDateTime: null, endDateTime: null },
                  venueId: [],
              },
          ],
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
const [dates] = defineField("dates");
const [instructorName] = defineField("instructorName");
const [instructorBio] = defineField("instructorBio");
const [instructorAvatar] = defineField("instructorAvatar");
const [instructorFamiliarity] = defineField("instructorFamiliarity");
const [coverImage] = defineField("coverImage");

const selfInstructored = ref<boolean | null>(null);

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
    values.dates = convertDatesToIsoString(values.dates)
        .sortDatesByStartDateTime()
        .removeDuplicatedDatesTime()
        .get();

    if (editingClassroom.value) {
        updateClassroom(editingClassroom.value.id, values).then((res) => {
            if (res.success) {
                classroomStore.updateClassroom(res.result);
                classroomStore.setEditingClassroom(res.result);
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
        if (res.success) {
            router.push(`/class/${res.result.id}/edit`);
            classroomStore.addClassroom(res.result);
            toast.add({
                severity: "success",
                summary: "Class created",
                group: "tc",
                life: 3000,
            });
            resetForm();
        }
    });
});

const onCoverImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileCategory", EFileType.CLASSROOM_COVER);

    try {
        const res = await uploadFile(formData);
        if (res.success) {
            coverImage.value = res.result.url;
        }
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};

const removeCoverImage = () => {
    coverImage.value = null;
};

const onInstructorAvatarChange = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileCategory", EFileType.INSTRUCTOR_AVATAR);

    try {
        const res = await uploadFile(formData);
        if (res.success) {
            instructorAvatar.value = res.result.url;
        }
    } catch (error) {
        console.error("Error uploading file:", error);
    }
};

const removeInstructorAvatar = () => {
    instructorAvatar.value = null;
};

function initEditorValue({ instance }: EditorLoadEvent) {
    instance.setContents(
        instance.clipboard.convert({
            html: editingClassroom.value?.details,
        })
    );
}

watch(selfInstructored, (value) => {
    if (value) {
        instructorName.value = user.value?.displayName;
        instructorBio.value = user.value?.email;
        instructorAvatar.value = user.value?.photoURL?.replace(
            "s96-c",
            "s512-c"
        );
    } else {
        instructorName.value = "";
        instructorBio.value = "";
        instructorAvatar.value = "";
    }
});
</script>

<template>
    <form @submit="onSubmit" class="flex w-full flex-col gap-2 lg:flex-row">
        <div class="lg:w-1/2">
            <div
                class="w-full border aspect-square rounded-3xl overflow-clip sticky top-20 max-w-96 max-h-96 m-auto lg:max-w-full lg:max-h-full"
            >
                <div class="w-full aspect-square bg-clip-border relative">
                    <img
                        v-if="coverImage"
                        :src="coverImage"
                        alt="Uploaded Image"
                        class="object-cover w-full h-full max-w-96 max-h-96 lg:max-w-full lg:max-h-full"
                    />
                    <button
                        v-else
                        class="flex items-center justify-center w-full h-full bg-slate-200"
                    >
                        <span class="text-slate-400">
                            <i class="pi pi-image" style="font-size: 4rem" />
                        </span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        class="absolute inset-0 opacity-0 cursor-pointer"
                        @change="onCoverImageChange"
                    />
                    <div class="absolute top-2 right-2">
                        <Button
                            v-if="coverImage"
                            icon="pi pi-times"
                            severity="danger"
                            text
                            rounded
                            aria-label="Cancel"
                            @click="removeCoverImage"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="relative flex flex-col gap-2 w-full lg:w-1/2">
            <div
                class="flex flex-col w-full gap-8 px-6 py-8 bg-white border rounded-3xl"
            >
                <div class="flex flex-col gap-2">
                    <InputText
                        id="title"
                        v-model="title"
                        aria-describedby="title-help"
                        :class="errors.title && 'p-invalid'"
                        placeholder="Class title"
                        class="font-bold !text-4xl !outline-none !border-none !shadow-none !p-0"
                        fluid
                    />
                    <VeeErrorMessage name="title" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <Editor
                        id="details"
                        v-model="details"
                        @load="initEditorValue"
                        editorStyle="height: 320px"
                        :class="errors.details && 'p-invalid'"
                        placeholder="Enter class details"
                    />
                    <VeeErrorMessage name="details" class="text-red-500" />
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
                    <VeeErrorMessage name="target" class="text-red-500" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite">Prerequisites (Optional) </label>
                    <Textarea
                        id="prerequisite"
                        v-model="prerequisite"
                        aria-describedby="prerequisite-help"
                        placeholder="What should attendees know beforehand?"
                        rows="3"
                        style="resize: none"
                    />
                    <VeeErrorMessage name="prerequisite" class="text-red-500" />
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
                    <VeeErrorMessage name="format" class="text-red-500" />
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
                    <VeeErrorMessage name="capacity" class="text-red-500" />
                </div>
                <div class="space-y-2">
                    <label for="dates">Date and time</label>
                    <div
                        class="bg-slate-50 border rounded-2xl p-2 space-y-3"
                        :class="errors.dates && 'border-red-500'"
                    >
                        <div
                            v-for="(entry, index) in dates"
                            :key="index"
                            class="relative"
                        >
                            <div
                                class="border bg-white p-4 rounded-xl space-y-2"
                            >
                                <div class="space-y-2">
                                    <label
                                        for="date"
                                        class="block text-sm font-medium text-slate-700 mb-1"
                                    >
                                        Day {{ index + 1 }}
                                    </label>
                                    <DatePicker
                                        id="date"
                                        v-model="entry.date.startDateTime"
                                        :name="
                                            'dates[' +
                                            index +
                                            '].date.startDateTime'
                                        "
                                        showIcon
                                        iconDisplay="input"
                                        fluid
                                        hourFormat="24"
                                        :minDate="new Date()"
                                        date-format="D d M yy"
                                        showButtonBar
                                        placeholder="Select date"
                                        v-on:update:model-value="
                                            (event) => {
                                                entry.date.endDateTime = event;
                                            }
                                        "
                                    />
                                </div>
                                <div class="flex gap-2">
                                    <div>
                                        <label
                                            for="date.startDateTime"
                                            class="block text-sm font-medium text-slate-700 mb-1"
                                        >
                                            From
                                        </label>
                                        <DatePicker
                                            id="date.startDateTime"
                                            v-model="entry.date.startDateTime"
                                            :name="
                                                'dates[' +
                                                index +
                                                '].date.startDateTime'
                                            "
                                            showIcon
                                            iconDisplay="input"
                                            fluid
                                            timeOnly
                                            :manual-input="false"
                                            :step-minute="10"
                                            hourFormat="24"
                                            date-format="D d M yy"
                                            placeholder="Select start time"
                                            v-on:update:model-value="
                                                (event) => {
                                                    entry.date.endDateTime =
                                                        event;
                                                }
                                            "
                                        >
                                            <template #inputicon="slotProps">
                                                <i
                                                    class="pi pi-clock"
                                                    @click="
                                                        slotProps.clickCallback
                                                    "
                                                /> </template
                                        ></DatePicker>
                                    </div>
                                    <div>
                                        <label
                                            for="date.endTime"
                                            class="block text-sm font-medium text-slate-700 mb-1"
                                        >
                                            To
                                        </label>
                                        <DatePicker
                                            id="date.endDateTime"
                                            v-model="entry.date.endDateTime"
                                            :name="
                                                'dates[' +
                                                index +
                                                '].date.endDateTime'
                                            "
                                            showIcon
                                            :min-date="entry.date.startDateTime"
                                            iconDisplay="input"
                                            fluid
                                            timeOnly
                                            :manual-input="false"
                                            :step-minute="10"
                                            hourFormat="24"
                                            date-format="D d M yy"
                                            placeholder="Select end time"
                                        >
                                            <template #inputicon="slotProps">
                                                <i
                                                    class="pi pi-clock"
                                                    @click="
                                                        slotProps.clickCallback
                                                    "
                                                /> </template
                                        ></DatePicker>
                                    </div>
                                </div>
                                <div
                                    :class="dates.length === 1 && 'hidden'"
                                    class="absolute top-1 right-1 !m-0"
                                >
                                    <Button
                                        icon="pi pi-times"
                                        severity="danger"
                                        text
                                        size="small"
                                        rounded
                                        aria-label="Cancel"
                                        @click="dates.splice(index, 1)"
                                    />
                                </div>
                            </div>
                        </div>
                        <Button
                            label="Add date"
                            icon="pi pi-plus"
                            class="w-full"
                            @click="
                                () =>
                                    dates.push({
                                        date: {
                                            startDateTime: null,
                                            endDateTime: null,
                                        },
                                        venueId: [],
                                    })
                            "
                        />
                    </div>
                    <VeeErrorMessage name="dates" class="text-red-500" />
                </div>
            </div>

            <div
                v-if="selfInstructored === null"
                class="flex flex-col space-y-4 p-4 rounded-3xl bg-white border"
            >
                <label for="selfInstructored"> Are you the instructor? </label>
                <div class="space-y-2">
                    <Button
                        label="Yes, I teach this class by myself"
                        severity="success"
                        outlined
                        fluid
                        @click="selfInstructored = true"
                    />
                    <Button
                        label="No, I will invite an instructor"
                        severity="secondary"
                        outlined
                        fluid
                        @click="selfInstructored = false"
                    />
                </div>
            </div>

            <div
                v-if="selfInstructored !== null"
                class="flex flex-col w-full bg-white border rounded-3xl"
            >
                <div class="flex flex-col gap-8 px-6 py-8">
                    <div class="flex flex-col gap-6">
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
                                    class="flex items-center justify-center w-full h-full bg-slate-200"
                                >
                                    <span class="text-slate-400">
                                        <i
                                            class="pi pi-image"
                                            style="font-size: 3rem"
                                        />
                                    </span>
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    class="absolute inset-0 opacity-0 cursor-pointer"
                                    @change="onInstructorAvatarChange"
                                />
                                <div class="absolute top-2 right-2">
                                    <Button
                                        v-if="instructorAvatar"
                                        icon="pi pi-times"
                                        severity="danger"
                                        text
                                        rounded
                                        aria-label="Cancel"
                                        @click="removeInstructorAvatar"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="space-y-4 w-full">
                            <div class="flex flex-col gap-2">
                                <InputText
                                    id="instructorName"
                                    v-model="instructorName"
                                    aria-describedby="instructorName-help"
                                    :class="
                                        errors.instructorName && 'p-invalid'
                                    "
                                    placeholder="Instructor name"
                                    class="!text-2xl font-bold outline-none w-full"
                                    unstyled
                                />
                                <VeeErrorMessage
                                    name="instructorName"
                                    class="text-red-500"
                                />
                            </div>
                            <div class="flex flex-col gap-2">
                                <Textarea
                                    id="instructorBio"
                                    v-model="instructorBio"
                                    aria-describedby="instructorBio-help"
                                    :class="errors.instructorBio && 'p-invalid'"
                                    rows="5"
                                    style="resize: none"
                                    placeholder="Tell us about the instructor"
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
                            :class="errors.instructorFamiliarity && 'p-invalid'"
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
            </div>
            <div class="sticky bottom-0 left-0 py-3 justify-end w-full z-40">
                <Button
                    :label="editingClassroom ? 'Update' : 'Create'"
                    icon="pi pi-check"
                    type="submit"
                    size="large"
                    :disabled="selfInstructored === null"
                    class="w-full"
                />
            </div>
        </div>
    </form>
</template>
