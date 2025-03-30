<script setup lang="ts">
import { signOut } from "firebase/auth";

const op = ref();
const user = useCurrentUser();

const auth = useFirebaseAuth();
const router = useRouter();
const toast = useToast();

const togglePopOver = (event: MouseEvent) => {
  op.value.toggle(event);
};

const handleProfileClick = () => {
  router.push("/profile");
  op.value.hide();
};

const handleSignOut = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
    await useAuth().logout();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error signing out",
      detail: "There was an error signing out. Please try again later.",
      life: 3000,
      group: "tc",
    });
  }
};
</script>
<template>
  <div class="cursor-pointer" @click="togglePopOver">
    <slot />
  </div>
  <Popover ref="op" class="!rounded-xl">
    <div class="flex flex-col justify-center items-center gap-2">
      <div
        class="flex gap-2 p-3 rounded-lg cursor-pointer hover:bg-slate-100 duration-200"
        @click="handleProfileClick"
      >
        <Avatar :image="user?.photoURL || ''" shape="circle" size="large" />
        <div>
          <h2 class="font-bold">
            {{ user?.displayName }}
          </h2>
          <p class="text-sm text-slate-500">
            {{ user?.email }}
          </p>
        </div>
      </div>
      <div class="flex flex-col w-full gap-2">
        <Button
          @click="handleSignOut"
          label="Logout"
          text
          icon="pi pi-sign-out"
          severity="danger"
        />
      </div>
    </div>
  </Popover>
</template>
