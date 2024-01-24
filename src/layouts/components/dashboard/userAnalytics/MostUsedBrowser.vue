<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = ref([
  { title: 'No.', key: 'no' },
  { title: 'Browser', key: 'browser' },
  { title: 'Visits', key: 'visits' },
  { title: 'Percentage', key: 'percentage' },
])

const data = ref([
  {
    no: 4,
    browser: 'Opera',
    visits: '33k',
    percentage: '48',
  },
  {
    no: 1,
    browser: 'Chrome',
    visits: '78k',
    percentage: '52',
  },
  {
    no: 2,
    browser: 'Safari',
    visits: '64k',
    percentage: '87',
  },
  {
    no: 3,
    browser: 'Edge',
    visits: '25k',
    percentage: '67',
  },
  {
    no: 5,
    browser: 'Vivaldi',
    visits: '26k',
    percentage: '44',
  },
])
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center justify-space-between">
        <h6 class="text-h6">
          Most Used Browser
        </h6>
        <div style="min-inline-size: 15rem;">
          <VTextField
            label="Search"
            density="compact"
          />
        </div>
      </div>

      <hr class="my-3">
      <VDataTable
        :headers="headers"
        :items="data"
      />
    </VCardText>
  </VCard>
</template>
