<template>
  <Tabs :value="0">
    <TabList  :pt="{ root: `border rounded-lg overflow-clip` }">
      <Tab :value="0">Drafted Content</Tab>
      <Tab :value="1">Class Materials</Tab>
    </TabList>
    <TabPanels :pt="{ root: `bg-transparent px-0` }">
      <TabPanel :value="0">
        <NuxtLayout name="create-drafted-content" />
      </TabPanel>
      <TabPanel :value="1">
        <NuxtLayout name="create-class-material" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
