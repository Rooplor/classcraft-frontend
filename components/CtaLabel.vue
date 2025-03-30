<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = useFirebaseAuth();

const signInWithGoogle = async () => {
  if (!auth) return;
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const token = await res.user.getIdToken();
    await useAuth().login(token);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};
</script>
<template>
  <div
    v-if="!auth"
    class="inline-flex justify-center items-center gap-4 p-2 bg-primary-100 text-primary border border-primary-300 rounded-lg text-lg text-center m-2 mb-4"
  >
    <p>Join ClassCraft for your full experience</p>
    <Button
      label="Continue with Google"
      icon="pi pi-google"
      rounded
      class="ml-2"
      size="small"
      @click="signInWithGoogle"
    />
  </div>
</template>
