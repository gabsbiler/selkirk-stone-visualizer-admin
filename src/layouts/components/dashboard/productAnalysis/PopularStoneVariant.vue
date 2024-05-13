<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import axiosIns from '@/plugins/axios'

const search = ref()
const loading = ref(true)

const header = [
  { title: 'No', key: 'rank', sortable: false },
  { title: 'Stone Profile', key: 'stone_category' },
  { title: 'Stone Color', key: 'stone_color' },
  { title: 'Count', key: 'count' },
]

const items = ref([])

// const items = ref([
//   {
//     stoneCategory: 'Hedge Stone',
//     stoneColor: 'Brown',
//     category: 'Exterior',
//     view: '192k',
//   },
//   {
//     stoneCategory: 'Stone Bricks',
//     stoneColor: 'Marble',
//     category: 'Interior',
//     view: '129k',
//   },
//   {
//     stoneCategory: 'Sandstone',
//     stoneColor: 'Brown',
//     category: 'Fireplace',
//     view: '98k',
//   },
//   {
//     stoneCategory: 'Quartzite',
//     stoneColor: 'Basalt',
//     category: 'Exterior',
//     view: '82k',
//   },
//   {
//     stoneCategory: 'Slate',
//     stoneColor: 'Onyx',
//     category: 'Interior',
//     view: '80k',
//   },
//   {
//     stoneCategory: 'Travertine',
//     stoneColor: 'Hedge Stone',
//     category: 'Fireplace',
//     view: '75k',
//   },
//   {
//     stoneCategory: 'Onyx',
//     stoneColor: 'Quartzite',
//     category: 'Interior',
//     view: '65k',
//   },
//   {
//     stoneCategory: 'Flint',
//     stoneColor: 'Gneiss',
//     category: 'Exterior',
//     view: '64k',
//   },
//   {
//     stoneCategory: 'Granite',
//     stoneColor: 'Marble',
//     category: 'Fireplace',
//     view: '35k',
//   },
//   {
//     stoneCategory: 'Gneiss',
//     stoneColor: 'Limestone',
//     category: 'Fireplace',
//     view: '15k',
//   },
// ],
// )

const indexedItems = computed(() => {
  return items.value.map((item, index) => {
    return { ...item, index: index + 1 } // Add 1 to start the index at 1 instead of 0
  })
})

const fetch = async () => {
  loading.value = true
  try {
    const response = await axiosIns.get('https://selkirkappapi-staging.azurewebsites.net/api/analytics/stone-stats/')

    items.value = response.data
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetch()
})
</script>

<template>
  <VCard :loading="loading">
    <VCardTitle class="d-flex align-center">
      <VCol>
        Ranking of Popular Stone Variant
      </VCol>
      <VCol
        cols="12"
        md="3"
      >
        <VTextField
          v-model="search"
          label="Search"
        />
      </VCol>
    </VCardTitle>
    <VCardText>
      <VDataTable
        :headers="header"
        :items="indexedItems"
        :search="search"
      >
        <template #item.index="{ item }">
          {{ item.value.index }}
        </template>
      </VDataTable>
    </VCardText>
  </VCard>
</template>
