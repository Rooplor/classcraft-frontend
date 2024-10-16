<script setup lang="js">
definePageMeta({
  layout: false,
});
const password = ref("");
</script>

<template>
        <ThemeToggle />
        <div class="flex justify-end min-h-screen">
            <div class="w-full max-w-screen-sm m-6">
                <Card class="h-full">
                    <template #title>Login</template>
                    <template #content>
                        <p class="m-0">
                            <Button> Continue with google </Button>
                        </p>
                    </template>
                </Card>
            </div>
        </div>
</template>
