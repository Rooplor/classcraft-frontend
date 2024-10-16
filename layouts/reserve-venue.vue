<script setup lang="ts">
const meetingUrl = ref();
</script>

<template>
    <div>
        <h2>Reserve venue</h2>
        <div class="p-4 bg-white border rounded-lg">
            <div>
                <h3>On-site venue</h3>
                <div class="flex gap-2">
                    <Card style="width: 25rem; overflow: hidden">
                        <template #header>
                            <img
                                alt="user header"
                                src="https://primefaces.org/cdn/primevue/images/usercard.png"
                            />
                        </template>
                        <template #title>Advanced Card</template>
                        <template #subtitle>Card subtitle</template>
                        <template #content>
                            <p class="m-0 line-clamp-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Inventore sed consequuntur
                                error repudiandae numquam deserunt quisquam
                                repellat libero asperiores earum nam nobis,
                                culpa ratione quam perferendis esse, cupiditate
                                neque quas!
                            </p>
                        </template>
                        <template #footer>
                            <div class="flex justify-end gap-4 mt-1">
                                <Button label="Save" class="w-1/2" />
                            </div>
                        </template>
                    </Card>
                    <Card style="width: 25rem; overflow: hidden">
                        <template #header>
                            <img
                                alt="user header"
                                src="https://primefaces.org/cdn/primevue/images/usercard.png"
                            />
                        </template>
                        <template #title>Advanced Card</template>
                        <template #subtitle>Card subtitle</template>
                        <template #content>
                            <p class="m-0 line-clamp-3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Inventore sed consequuntur
                                error repudiandae numquam deserunt quisquam
                                repellat libero asperiores earum nam nobis,
                                culpa ratione quam perferendis esse, cupiditate
                                neque quas!
                            </p>
                        </template>
                        <template #footer>
                            <div class="flex justify-end gap-4 mt-1">
                                <Button label="Save" class="w-1/2" />
                            </div>
                        </template>
                    </Card>
                </div>
            </div>
            <Divider type="solid" />
            <div>
                <h3>Online platform</h3>
                <div class="flex flex-col gap-2">
                    <label for="meetingUrl">Meeting url</label>
                    <div class="flex">
                        <InputText id="meetingUrl" v-model="meetingUrl" />
                        <Button label="Save" icon="pi pi-check" @click="" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
