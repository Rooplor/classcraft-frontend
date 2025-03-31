<script setup lang="ts"></script>
<template>
  <Tabs :value="0">
    <TabList :pt="{ root: `border rounded-lg overflow-clip` }">
      <Tab :value="0">Questions</Tab>
      <Tab :value="1">Responses</Tab>
    </TabList>
    <TabPanels :pt="{ root: `!bg-transparent !px-0` }">
      <TabPanel :value="0">
        <NuxtLayout name="create-feedback-form" />
      </TabPanel>
      <TabPanel :value="1">
        <NuxtLayout name="feedback-response" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
