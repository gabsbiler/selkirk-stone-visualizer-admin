<script setup lang="ts">
import axiosIns from '@/plugins/axios'

const items = ref([])

const loading = ref(false)

const fetch = async () => {
  loading.value = true
  try {
    const response = await axiosIns.get('https://selkirkappapi.azurewebsites.net/api/analytics/aggregate/')

    items.value = response.data.locations
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
  <VCard
    height="400"
    :loading="loading"
  >
    <VCardText>
      <h6 class="text-h6">
        Most Frequent Users Location
      </h6>
      <hr class="my-3">
      <div class="d-flex  justify-space-between">
        <div
          class="d-flex align-center gap-x-2"
          style="min-inline-size: 12rem;"
        >
          Filter By
          <VSelect
            label="Select"
            :items="['User', 'IP Address']"
            density="compact"
          />
        </div>
        <div style="min-inline-size: 10rem;">
          <VTextField
            label="Search"
            density="compact"
          />
        </div>
      </div>
      <div>
        <VTable>
          <thead>
            <tr>
              <th>COUNTRY</th>
              <th>USERS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.country"
            >
              <td>{{ item.country }}</td>
              <td>{{ item.count }}</td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VCardText>
  </VCard>
</template>
