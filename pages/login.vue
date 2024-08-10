<template>
  <ThemeToggle />
    <div class="min-h-screen flex justify-end ">
        <div class="max-w-screen-sm w-full m-6">
            <Card class="h-full">
                <template #title>Login</template>
                <template #content>
                    <p class="m-0">
                        <Button>
                          Continue with google
                        </Button>
                    </p>
                </template>
            </Card>
        </div>
    </div>
</template>
<script setup>
const password = ref("");
</script>
