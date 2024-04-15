<script setup lang="ts">
import BarChart from '@core/libs/chartjs/components/BarChart'
import { computed } from 'vue'

const props = defineProps<{
  loading: boolean
  data: object
  days: number
}>()

const { loading, data, days } = toRefs(props)

watchDebounced(data, () => {
  const date = new Date(new Date().setHours(0, 0, 0, 0))
  const minDate = new Date(date)

  minDate.setDate(date.getDate() - days.value)

  console.log(minDate)

  const value = data.value || []

  const firstVisits = value.reduce((p, c) => {
    const firstVisit = new Date(new Date(c.FirstVisit))
    if (firstVisit >= minDate) {
      const firstVisitText = c.FirstVisit.substring(0, 10)
      if (!p.hasOwnProperty(firstVisitText))
        p[firstVisitText] = { count: 0, userIds: [c.UserId] }

      if (!p[firstVisitText].userIds.includes(c.UserId))
        p[firstVisitText].count++
    }

    return p
  }, {})

  const firstVisitsTotal = Object.values(firstVisits).reduce((a, b) => a + b.count, 0)

  const visits = value.reduce((p, c) => {
    const timeGeneratedText = c.TimeGenerated.substring(0, 10)
    if (!p.hasOwnProperty(timeGeneratedText))
      p[timeGeneratedText] = 0

    p[timeGeneratedText]++

    return p
  }, {})

  const visitsTotal = Object.values(visits).reduce((a, b) => a + b, 0)

  const firstVisitorsChartDataCopy = JSON.parse(JSON.stringify(firstVisitorsChartData.value))
  const firstVisitorsKeys = Object.keys(firstVisits).sort((a, b) => new Date(a) - new Date(b))

  firstVisitorsChartDataCopy.labels = firstVisitorsKeys
  firstVisitorsChartDataCopy.datasets[0].data = firstVisitorsKeys.map(x => firstVisits[x].count)
  firstVisitorsChartData.value = firstVisitorsChartDataCopy
  firstVisitorsPercentage.value = Math.round((firstVisitsTotal / visitsTotal) * 100)

  const visitorsChartDataCopy = JSON.parse(JSON.stringify(visitorsChartData.value))
  const visitorsKeys = Object.keys(visits).sort((a, b) => new Date(a) - new Date(b))

  visitorsChartDataCopy.labels = visitorsKeys
  visitorsChartDataCopy.datasets[0].data = visitorsKeys.map(x => visits[x])
  visitorsChartData.value = visitorsChartDataCopy
  visitorsPercentage.value = 100 - firstVisitorsPercentage.value
}, {})

const visitorsPercentage = ref(0)

const visitorsChartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Visitors',
      data: [],
      backgroundColor: 'green',
      borderRadius: 20,
      barThickness: 30,
    },
  ],
})

const firstVisitorsPercentage = ref(0)

const firstVisitorsChartData = ref({
  labels: [],
  datasets: [
    {
      label: 'New Visitors',
      data: [],
      backgroundColor: 'green',
      borderRadius: 20,
      barThickness: 30,
    },
  ],
})

// Computed property to create the chart options
const chartOptions = computed(() => {
  return {
    scales: {
      y: {
        ticks: {
          display: false, // This will hide the y-axis labels
        },
        grid: {
          display: false, // Optionally, this will hide the y-axis grid lines
          drawBorder: false, // This will hide the y-axis line
        },
      },
    },
    plugins: {
      legend: {
        display: false, // This will hide the legend
      },
    },
  }
})
</script>

<template>
  <section>
    <VRow>
      <VCol>
        <VCard :loading="loading">
          <VRow class="mt-1">
            <VCol
              cols="12"
              md="6"
            >
              <VCardTitle>
                <VRow class="d-flex align-center">
                  <VCol cols="5">
                    Visitors
                  </VCol>
                </VRow>
              </VCardTitle>
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                    class="d-flex flex-column justify-end"
                  >
                    <div class="d-flex">
                      <h2 class="text-h2">
                        {{ visitorsPercentage }}%
                      </h2>
                    </div>
                  </VCol>
                  <VCol>
                    <BarChart
                      :height="150"
                      :chart-data="visitorsChartData"
                      :options="chartOptions"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCol>

            <VCol
              cols="12"
              md="6"
            >
              <VCardTitle>New Visitors</VCardTitle>
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                    class="d-flex flex-column justify-end"
                  >
                    <div class="d-flex">
                      <h2 class="text-h2">
                        {{ firstVisitorsPercentage }}%
                      </h2>
                    </div>
                  </VCol>
                  <VCol>
                    <BarChart
                      :height="150"
                      :chart-data="firstVisitorsChartData"
                      :options="chartOptions"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
