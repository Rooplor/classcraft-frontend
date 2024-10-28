<script setup lang="ts">
const { getUserById } = useUser();

const router = useRouter();
const id = router.currentRoute.value.params.id;

const user = ref();

user.value = (await getUserById(id.toString())).result;
console.log(user.value);
</script>

<template>
    <div class="w-full flex flex-col gap-[10px] p-[10px]">
        <div class="flex gap-8 bg-white border rounded-3xl p-8">
            <img
                :src="user?.profilePicture"
                :alt="user?.username"
                class="rounded-full w-52 h-52 aspect-square object-cover bg-gray-200"
            />
            <div class="space-y-4">
                <div class="space-y-2">
                    <div class="flex items-center gap-4">
                        <h1 class="text-2xl font-bold">
                            {{ user?.username }}
                        </h1>
                        <Button label="Follow" icon="pi pi-plus" size="small" />
                    </div>
                    <p class="text-gray-500">{{ user?.email }}</p>
                </div>
                <p class="space-x-2">
                    <span>2 Classes</span> <span>5 Followers</span>
                </p>
                <p class="text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsa rerum doloremque iure illo quae consequatur
                    repellendus. Adipisci quibusdam, debitis magni distinctio
                    accusantium accusamus nihil maxime autem id labore est
                    dicta!
                </p>
            </div>
        </div>
        <div class="flex flex-col gap-6 p-8 bg-white rounded-3xl border">
            <h2 class="text-xl font-bold">Hosted classes</h2>
            <div v-if="user?.myClassrooms?.length >= 0" class="space-y-[10px]">
                <ClassroomItem
                    v-for="(classroom, index) in user?.myClassrooms"
                    :key="index"
                    :classroom="classroom"
                    class="border-none"
                />
            </div>
            <div v-else>
                <p class="py-16 text-gray-500 text-center">No classes hosted yet</p>
            </div>
        </div>
    </div>
</template>
