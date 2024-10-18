<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

definePageMeta({
    layout: false,
});

const auth = useFirebaseAuth();
const router = useRouter();

const signInWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
        router.push("/");
    });
};
</script>
<template>
    <div class="min-h-screen flex justify-end">
        <div class="max-w-screen-sm w-full m-6">
            <Card class="h-full">
                <template #title>Login</template>
                <template #content>
                    <p class="m-0">
                        <Button @click="signInWithGoogle">
                            Continue with google
                        </Button>
                    </p>
                </template>
            </Card>
        </div>
    </div>
</template>
