<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import axiosIns from '@/plugins/axios'

const headers = ref([
  { title: 'Browser', key: 'browser' },
  { title: 'Visits', key: 'count' },
])

const data = ref([])

const loading = ref(false)

const fetch = async () => {
  loading.value = true
  try {
    const response = await axiosIns.get('https://selkirkappapi.azurewebsites.net/api/analytics/aggregate/')

    data.value = response.data.browsers_count
    console.log(data.value)
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
