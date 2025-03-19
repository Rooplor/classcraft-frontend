<script setup lang="ts">

</script>
<template>
  <Tabs :value="0">
    <TabList>
      <Tab :value="0">Questions</Tab>
      <Tab :value="1">Responses</Tab>
    </TabList>
    <TabPanels>
      <TabPanel :value="0">
        <NuxtLayout name="create-feedback-form" />
      </TabPanel>
      <TabPanel :value="1">
        <NuxtLayout name="feedback-response" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
