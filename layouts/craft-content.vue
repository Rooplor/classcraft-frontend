<template>
  <Tabs :value="0">
    <TabList>
      <Tab :value="0">Content</Tab>
      <Tab :value="1">Class Materials</Tab>
    </TabList>
    <TabPanels>
      <TabPanel :value="0">
        <NuxtLayout name="create-craft-content" />
      </TabPanel>
      <TabPanel :value="1">
        <NuxtLayout name="create-class-material" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
