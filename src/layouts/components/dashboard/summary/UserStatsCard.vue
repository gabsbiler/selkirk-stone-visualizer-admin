<script setup lang="ts">
import { useTheme } from 'vuetify'
import axiosIns from '@/plugins/axios'
import { getLineChartConfig } from '@core/libs/chartjs/chartjsConfig'
import LineChart from '@core/libs/chartjs/components/LineChart'

const content = ref()

const fetch = async () => {
  try {
    const response = await axiosIns.get('https://selkirkappapi.azurewebsites.net/api/analytics/aggregate/')

    data.value = response.data
  }
  catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  fetch()
})

const filterTab = ref('week')

const vuetifyTheme = useTheme()

const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      fill: false,
      label: false,
      tension: 0.5,
      pointRadius: 1,
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: 'green',
      backgroundColor: 'green',
      pointHoverBorderWidth: 1,
      pointHoverBorderColor: 'white',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'green',
      data: [80, 150, 350, 200],
    },

  ],
}

const chartConfig = computed(() => getLineChartConfig(vuetifyTheme.current.value))

const tabs = [
  { title: 'Month' },
  { title: 'Week' },
  { title: 'Day' },
]
</script>

<template>
  <VCard height="400">
    <VCardText>
      <VTabs
        v-model="filterTab"
        color="primary"
        align-tabs="right"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.title"
        >
          {{ tab.title }}
        </VTab>
      </VTabs>
      <VWindow v-model="filterTab">
        <!-- Month -->
        <VWindowItem key="month">
          <LineChart
            :chart-options="chartConfig"
            :height="700"
            :chart-data="data"
          />
        </VWindowItem>

        <VWindowItem key="week">
          <LineChart
            :chart-options="chartConfig"
            :height="700"
            :chart-data="data"
          />
        </VWindowItem>
        <VWindowItem key="day">
          <LineChart
            :chart-options="chartConfig"
            :height="700"
            :chart-data="data"
          />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
</template>
