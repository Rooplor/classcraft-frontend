<script setup lang="ts">

const props = defineProps<{
  classroomId: string;
}>();

const { getCheckInQrCode } = useClassroomForm();

const qrCode = ref<any>();

const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

onMounted(async () => {
  let res = await getCheckInQrCode(props.classroomId);
  qrCode.value = await blobToBase64(res);
});

</script>
<template>
  <img :src="qrCode" alt="QR Code" />
</template>
