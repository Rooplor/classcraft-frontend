<script setup lang="ts">
const detail = ref();
const target = ref();
const prerequisite = ref();
const classType = ref();
const format = ref();
const capacity = ref();
const dates = ref();

const log = () => {
    console.log({
        detail: detail.value,
        target: target.value,
        prerequisite: prerequisite.value,
        classType: classType.value,
        format: format.value,
        capacity: capacity.value,
        dates: dates.value,
    });
};
</script>

<template>
    <div>
        <h2>Fill class detail</h2>
        <div class="flex">
            <div class="w-[32rem] aspect-square bg-red-300 rounded-lg"></div>
            <div class="p-4 bg-white border rounded-lg">
                <div class="flex flex-col gap-2">
                    <label for="detail">รายละเอียด</label>
                    <InputText id="detail" v-model="detail" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="target">เหมาะกับใคร</label>
                    <InputText id="target" v-model="target" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite"
                        >พื้นฐานที่ต้องการสำหรับผู้เรียน (Optional)
                    </label>
                    <InputText id="prerequisite" v-model="prerequisite" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="classType">ประเภทคลาสเรียน</label>
                    <SelectButton
                        v-model="classType"
                        :options="['Lecture', 'Workshop', 'Discussion']"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="format">รูปแบบการเรียน </label>
                    <SelectButton
                        v-model="format"
                        :options="['Online', 'On-site', 'Hybrid']"
                    />
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
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite">วันที่เรียน</label>
                    <DatePicker
                        v-model="dates"
                        selectionMode="multiple"
                        :manualInput="false"
                    />
                </div>
                <div class="flex justify-end">
                    <Button label="Save" icon="pi pi-check" @click="log" />
                </div>
            </div>
        </div>
    </div>
</template>
