<script setup lang="ts">
const items = ref([
  {
    country: 'Nigeria',
    count: '85k',
  },
  {
    country: 'Philippines',
    count: '85k',
  },
  {
    country: ' Canada',
    count: '85k',
  },
  {
    country: 'Taiwan',
    count: '85k',
  },
])
</script>

<template>
  <VCard height="400">
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
