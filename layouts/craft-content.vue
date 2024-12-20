<script setup lang="ts">
import type { IClassroom } from "../types/Classroom";
import type { IContent } from "../types/Content";

const classroomStore = useClassroomStore();
const { editingClassroom } = storeToRefs(classroomStore) as {
    editingClassroom: Ref<IClassroom | null>;
};

const content = ref<IContent[]>(
    JSON.parse(editingClassroom?.value?.content || "[]")
);
const editingContent = ref<IContent | null>(null);
const confirm = useConfirm();
const toast = useToast();
const { updateContent } = useClassroom();

const cleanContentData = (content: IContent) => {
    // remove all empty activity guides after last non-empty activity guide
    content.activityGuides = content.activityGuides.filter(
        (g, i) =>
            g.activityGuide.trim() !== "" ||
            content.activityGuides
                .slice(i + 1)
                .some((g) => g.activityGuide.trim() !== "")
    );
    // remove all empty presentation guides after last non-empty presentation guide
    content.presentationGuides = content.presentationGuides.filter(
        (g, i) =>
            g.presentationGuide.trim() !== "" ||
            content.presentationGuides
                .slice(i + 1)
                .some((g) => g.presentationGuide.trim() !== "")
    );
};

const onSaveContent = (newContent: IContent) => {
    if (editingClassroom.value === null) return;

    delete newContent.init;
    const index = content.value.findIndex((c) => c.id === newContent.id);
    cleanContentData(newContent);
    content.value[index] = newContent;
    updateContent(editingClassroom.value.id, content.value).then((res) => {
        if (res.success) {
            classroomStore.setEditingClassroom(res.result);
            toast.add({
                severity: "success",
                summary: "Saved",
                detail: `Content has been saved`,
                group: "tc",
                life: 3000,
            });
            editingContent.value = null;
        }
    });
};

const addContent = () => {
    let newContent: IContent = {
        id: content.value.length + 1,
        title: "",
        content: "",
        activityGuides: [],
        presentationGuides: [],
    };
    content.value.push(newContent);
    editingContent.value = {
        init: newContent,
        ...newContent,
    };
};

const removeContent = (id: number) => {
    if (editingClassroom.value === null) return;

    content.value = content.value.filter((c) => c.id !== id);
    updateContent(editingClassroom.value.id, content.value).then((res) => {
        if (res.success) {
            toast.add({
                severity: "error",
                summary: "Deleted",
                detail: `Content has been removed`,
                group: "tc",
                life: 3000,
            });
            editingContent.value = null;
        }
    });
};

const addActivityGuide = () => {
    if (editingContent.value) {
        let newActivityGuide = {
            id: `${editingContent.value.id}-${
                editingContent.value.activityGuides.length + 1
            }`,
            activityGuide: "",
        };
        editingContent.value.activityGuides.push(newActivityGuide);
    }
};

const removeActivityGuide = (id: string) => {
    if (editingContent.value) {
        editingContent.value.activityGuides =
            editingContent.value.activityGuides.filter((g) => g.id !== id);
    }
};

const addPresentationGuide = () => {
    if (editingContent.value) {
        let newPresentationGuide = {
            id: `${editingContent.value.id}-${
                editingContent.value.presentationGuides.length + 1
            }`,
            presentationGuide: "",
        };
        editingContent.value.presentationGuides.push(newPresentationGuide);
    }
};

const removePresentationGuide = (id: string) => {
    if (editingContent.value) {
        editingContent.value.presentationGuides =
            editingContent.value.presentationGuides.filter((g) => g.id !== id);
    }
};

const isContentEmpty = (content: IContent | undefined) => {
    if (content) {
        return content.title.trim() === "" && content.content.trim() === "";
    }
    return false;
};

const confirmDelete = (content: IContent) => {
    confirm.require({
        message: `Are you sure you want to delete this question: ${content.title}?`,
        header: "Delete Confirmation",
        icon: "pi pi-exclamation-triangle",
        rejectProps: {
            label: "Cancel",
        },
        acceptProps: {
            label: "Delete",
            text: true,
            severity: "danger",
        },
        accept: () => {
            removeContent(content.id);
        },
    });
};
</script>
<template>
    <div class="space-y-4">
        <div
            v-if="content.length > 0"
            v-for="(c, index) in content"
            :key="index"
        >
            <div
                v-if="c.id === editingContent?.id"
                class="border rounded-3xl bg-white overflow-clip divide-y"
            >
                <div class="p-4">
                    <div class="flex justify-between items-center gap-2">
                        <InputText
                            v-model="editingContent.title"
                            placeholder="Enter Title"
                            unstyled
                            focus
                            class="w-full text-xl border p-2 bg-slate-50 font-bold rounded-lg outline-none"
                        />
                    </div>
                </div>
                <div class="p-4 space-y-8">
                    <Textarea
                        v-model="editingContent.content"
                        placeholder="Content"
                        unstyled
                        rows="5"
                        class="w-full p-2 border bg-slate-50 outline-none resize-none rounded-lg"
                    />
                    <div class="space-y-2">
                        <small class="text-slate-400">Activity Guides</small>
                        <div class="space-y-2">
                            <div
                                v-for="(
                                    guide, index
                                ) in editingContent.activityGuides"
                                :key="index"
                                class="p-2 px-4 bg-slate-100 text-slate-500 rounded-xl flex gap-2 items-center duration-150 hover:bg-slate-200"
                            >
                                <p class="text-slate-400">{{ index + 1 }}.</p>
                                <div class="w-full flex justify-end gap-2">
                                    <InputText
                                        v-model="guide.activityGuide"
                                        placeholder="Enter Activity Guide"
                                        unstyled
                                        required
                                        class="w-full bg-transparent outline-none border-b border-slate-300"
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        severity="danger"
                                        rounded
                                        text
                                        @click="removeActivityGuide(guide.id)"
                                    />
                                </div>
                            </div>
                            <Button
                                @click="addActivityGuide"
                                unstyled
                                class="w-full p-4 border rounded-xl text-primary bg-primary-50 border-primary hover:bg-primary-100 duration-150"
                            >
                                <i class="pi pi-plus" />&nbsp; Add Activity
                                Guide
                            </Button>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <small class="text-slate-400">
                            Presentation Guides
                        </small>
                        <div class="grid grid-cols-2 gap-2">
                            <div
                                v-for="(
                                    guide, index
                                ) in editingContent.presentationGuides"
                                :key="index"
                                class="aspect-video bg-slate-100 text-slate-500 rounded-xl p-4 duration-150 hover:bg-slate-200"
                            >
                                <div class="relative">
                                    <Textarea
                                        v-model="guide.presentationGuide"
                                        placeholder="Presentation Guide"
                                        rows="7"
                                        required
                                        unstyled
                                        class="bg-transparent outline-none border-slate-300 w-full"
                                    />
                                    <div class="absolute top-0 right-0">
                                        <Button
                                            icon="pi pi-times"
                                            severity="danger"
                                            rounded
                                            text
                                            @click="
                                                removePresentationGuide(
                                                    guide.id
                                                )
                                            "
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                @click="addPresentationGuide"
                                label="Add"
                                fluid
                                unstyled
                                class="aspect-video p-2 border rounded-xl text-primary bg-primary-50 border-primary hover:bg-primary-100 duration-150"
                            >
                                <i class="pi pi-plus" />&nbsp; Add Presentation
                                Guide
                            </Button>
                        </div>
                    </div>
                </div>
                <div class="p-4 flex gap-2 justify-between">
                    <Button
                        severity="danger"
                        text
                        label="Delete"
                        @click="confirmDelete(editingContent)"
                    />
                    <div class="flex gap-2">
                        <Button
                            severity="secondary"
                            label="Cancel"
                            @click="
                                        () => {
                                            isContentEmpty(editingContent?.init) 
                                            ? confirmDelete(editingContent?.init as IContent)
                                            : editingContent = null
                                        }
                                    "
                        />
                        <Button
                            icon="pi pi-check"
                            label="Save"
                            :disabled="isContentEmpty(editingContent)"
                            @click="onSaveContent(editingContent)"
                        />
                    </div>
                </div>
            </div>
            <ContentCard v-else :content="c" @edit="editingContent = c" />
        </div>
        <div v-else>
            <div class="flex justify-center items-center h-52">
                <p class="text-slate-400">
                    No content available. Click the button below to add content.
                </p>
            </div>
        </div>
        <Button
            :disabled="editingContent !== null && content.length > 0"
            @click="addContent"
            unstyled
            class="w-full p-6 border rounded-2xl duration-150"
            :class="
                editingContent !== null && content.length > 0
                    ? 'cursor-not-allowed text-slate-400 bg-slate-100 border-slate-100'
                    : 'text-primary bg-primary-50 border-primary hover:bg-primary-100'
            "
        >
            <i class="pi pi-plus" />&nbsp; Add Content
        </Button>
    </div>
</template>
