<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

definePageMeta({
    layout: false,
});

const auth = useFirebaseAuth();
const router = useRouter();
const toast = useToast();

const signInWithGoogle = async () => {
    if (!auth) return;
    try {
        const res = await signInWithPopup(auth, new GoogleAuthProvider());
        const token = await res.user.getIdToken();
        await useAuth().login(token);
        router.push("/");
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Error signing in with Google",
            detail: "There was an error signing in with Google. Please try again later.",
            life: 3000,
            group: "tc",
        });
    }
};

useHead({
    title: "Login · ClassCraft",
    meta: [
        {
            name: "description",
            content: "Login to ClassCraft",
        },
        {
            name: "keywords",
            content: "ClassCraft, login",
        },
    ],
});
</script>
<template>
    <div
        class="min-h-screen flex justify-end bg-gradient-to-br from-primary to-indigo-600"
    >
        <div class="w-full m-auto text-center text-white space-y-5">
            <h2 class="text-8xl font-bold">ClassCraft</h2>
            <p class="text-4xl">Knowledge sharing made simple</p>
        </div>
        <div
            class="flex flex-col justify-center max-w-md w-full bg-white rounded-xl shadow-lg p-6 m-2"
        >
            <h1 class="text-4xl font-bold text-gray-800 text-center mb-8">
                Welcome
            </h1>
            <p class="m-0 text-center">
                <button
                    @click="signInWithGoogle"
                    class="w-full flex items-center gap-2 justify-center py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-200"
                >
                    <i class="pi pi-google" /> Continue with Google
                </button>
            </p>
        </div>
    </div>
</template>
