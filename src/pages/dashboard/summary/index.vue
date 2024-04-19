<script setup lang="ts">
import PopularStoneVariant from '@/layouts/components/dashboard/productAnalysis/PopularStoneVariant.vue'
import TopMostCollectedStoneVariant from '@/layouts/components/dashboard/summary/TopMostCollectedStoneVariant.vue'
import TopMostPopularStoneVariant from '@/layouts/components/dashboard/summary/TopMostPopularStoneVariant.vue'
import UserStatsCard from '@/layouts/components/dashboard/summary/UserStatsCard.vue'
import axiosIns from '@/plugins/axios'

const data = ref()

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
</script>

<template>
  <section>
    <VRow>
      <!-- Users Statistic Card -->
      <VCol cols="12">
        <UserStatsCard />
      </VCol>
      <!-- User Location Heatmap -->
      <!--
        <VCol
        cols="12"
        lg="7"
        md="6"
        >
        <UserLocHeatmap />
        </VCol>
      -->
      <VCol cols="12">
        <PopularStoneVariant />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <TopMostPopularStoneVariant />
      </VCol>
      <VCol
        cols="12"
        md="6"
      >
        <TopMostCollectedStoneVariant />
      </VCol>
    </VRow>
  </section>
</template>
