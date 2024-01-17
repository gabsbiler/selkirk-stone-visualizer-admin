<script setup lang="ts">
import { computed, ref } from 'vue'
import LineChart from '@core/libs/chartjs/components/LineChart'
import BarChart from '@core/libs/chartjs/components/BarChart'

const userDaysSelect = ref('7 Days')

const data = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      tension: 0.5,
      pointRadius: 5,
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: 'green',
      backgroundColor: 'green',
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: 'white',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'green',
      data: [80, 150, 350, 200, 150, 123, 300],
    },
  ],
}

const newVisitorsChart = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      label: 'Daily Visitors',
      data: [80, 150, 350, 200, 180, 300, 400], // Example data
      backgroundColor: 'green', // Use your desired color
      borderRadius: 20, // Adjust for desired roundness
      barThickness: 30, // Adjust bar width
    },
  ],
}

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
        <VCard>
          <VRow class="mt-1">
            <VCol
              cols="12"
              md="6"
            >
              <VCardTitle>
                <VRow class="d-flex align-center">
                  <VCol cols="5">
                    Users
                  </VCol>
                  <VCol cols="3" />
                  <VSelect
                    v-model="userDaysSelect"
                    :items="['7 Days', '14 Days', '30 Days', '3 Months']"
                    variant="plain"
                    density="compact"
                  />
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
                        82%
                      </h2>
                    </div>

                    <p class="text-success">
                      <VIcon icon="mdi-arrow-up" />19.6%
                    </p>
                  </VCol>
                  <VCol>
                    <LineChart
                      :height="150"
                      :chart-data="data"
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
                        23%
                      </h2>
                    </div>

                    <p class="text-error">
                      <VIcon icon="mdi-arrow-down" />19.6%
                    </p>
                  </VCol>
                  <VCol>
                    <BarChart
                      :height="150"
                      :chart-data="newVisitorsChart"
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
