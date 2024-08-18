<script setup lang="ts">
  
</script>

<template>
    <div>
        <h2>Fill class detail</h2>
        <div class="flex">
            <div class="w-[32rem] aspect-square bg-red-300 rounded-lg"></div>
            <div class="p-4 bg-white border rounded-lg">
                <div class="flex flex-col gap-2">
                    <label for="details">Details</label>
                    <InputText id="details" v-model="value" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="for">เหมาะกับใคร</label>
                    <InputText id="for" v-model="value" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite"
                        >พื้นฐานที่ต้องการสำหรับผู้เรียน (Optional)
                    </label>
                    <InputText id="prerequisite" v-model="value" />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite">ประเภทคลาสเรียน </label>
                    <SelectButton
                        v-model="value"
                        :options="['Lecture', 'Workshop', 'Discussion']"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite">รูปแบบการเรียน </label>
                    <SelectButton
                        v-model="value"
                        :options="['Online', 'On-site', 'Hybrid']"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="prerequisite">จำนวนผู้เรียน </label>
                    <SelectButton
                        v-model="value"
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
                    <label for="prerequisite">วันที่เรียน </label>
                    <DatePicker
                        v-model="dates"
                        selectionMode="multiple"
                        :manualInput="false"
                    />
                </div>
                <div class="flex justify-end">
                    <Button label="Save" icon="pi pi-check" @click="" />
                </div>
            </div>
        </div>
    </div>
</template>
