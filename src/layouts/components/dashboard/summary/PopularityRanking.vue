<script setup lang="ts">
import { VDataTable } from 'vuetify/components'

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
      <VDataTable
        :items="items"
        :headers="headers"
        items-per-page="5"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.stoneVariant }}</td>
            <td>{{ item.location }}</td>
            <td>
              {{ formatNumber(item.visits) }}
            </td>
            <td>
              <VProgressLinear
                v-model="item.dataInPercentage"
                color="primary"
                height="20"
              >
                <template #default="{ value }">
                  {{ Math.ceil(value) }}%
                </template>
              </VProgressLinear>
            </td>
          </tr>
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>
