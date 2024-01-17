<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const tabs = [
  { title: 'By Stone Variant' },
  { title: 'By Location' },
]

const selectedTab = ref('By Stone Variant')

const headers = [
  { title: 'Stone Variant', key: 'stoneVariant' },
  { title: 'Location', key: 'location' },
  { title: 'Visits', key: 'visits' },
  { title: 'Data in Percentage', key: 'dataInPercentage' },
]

const items = [
  {
    stoneVariant: 'Hedge Stone, Brown',
    location: 'Toronto',
    visits: 89203,
    dataInPercentage: 25.32,
  },
  {
    stoneVariant: 'Stone Bricks, Marble',
    location: 'Ontario',
    visits: 12123,
    dataInPercentage: 19.23,
  },
  {
    stoneVariant: 'Sandstone, Brown',
    location: 'Alberta',
    visits: 328,
    dataInPercentage: 3.23,
  },
  {
    stoneVariant: 'Quartzire, Basalt',
    location: 'Quebec',
    visits: 142,
    dataInPercentage: 3.99,
  },
  {
    stoneVariant: 'Slate, Limestone',
    location: 'Toronto',
    visits: 85,
    dataInPercentage: 2.12,
  },
]

const formatNumber = num => {
  if (num < 1000)
    return num.toString() // if less than 1000, return the number

  else if (num < 1000000)
    return `${(num / 1000).toFixed(2)}k` // convert to 'k' for thousands

  else
    return `${(num / 1000000).toFixed(2)}M` // convert to 'M' for millions
}
</script>

<template>
  <VCard title="Popularity Ranking">
    <VCardText>
      <VTabs
        v-model="selectedTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab"
        >
          {{ tab.title }}
        </VTab>
      </VTabs>
      <hr class="my-3">
      <VWindow v-model="selectedTab">
        <VWindowItem key="By Stone Variant">
          <VDataTable
            :items="items"
            :headers="headers"
            items-per-page="5"
          >
            <template #item.visits="{ item }">
              {{ formatNumber(item.props.title.visits) }}
            </template>

            <template #item.dataInPercentage="{ item }">
              <VProgressLinear
                v-model="item.props.title.dataInPercentage"
                color="primary"
                height="20"
              >
                <template #default="{ value }">
                  {{ Math.ceil(value) }}%
                </template>
              </VProgressLinear>
            </template>
          </VDataTable>
        </VWindowItem>
        <VWindowItem key="By Location">
          <VDataTable
            :items="items"
            :headers="headers"
            items-per-page="5"
          >
            <template #item.visits="{ item }">
              {{ formatNumber(item.props.title.visits) }}
            </template>

            <template #item.dataInPercentage="{ item }">
              <VProgressLinear
                v-model="item.props.title.dataInPercentage"
                color="primary"
                height="20"
              >
                <template #default="{ value }">
                  {{ Math.ceil(value) }}%
                </template>
              </VProgressLinear>
            </template>
          </VDataTable>
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
