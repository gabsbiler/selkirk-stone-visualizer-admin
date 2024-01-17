<script setup lang="ts">
const filterTab = ref('week')
</script>

<template>
  <VCard>
    <VCardText>
      <VTabs
        v-model="filterTab"
        color="primary"
        align-tabs="center"
      >
        <VTab value="month">
          Month
        </VTab>
        <VTab value="week">
          Week
        </VTab>
        <VTab value="day">
          Day
        </VTab>
      </VTabs>
      <VWindow v-model="filterTab">
        <VWindowItem key="month">
          month
        </VWindowItem>
        <VWindowItem key="week">
          week
        </VWindowItem>
        <VWindowItem key="day">
          day
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
