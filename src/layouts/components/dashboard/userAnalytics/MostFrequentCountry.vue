<script setup lang="ts">
const props = defineProps<{
  data: object
}>()

const { data } = toRefs(props)

watchDebounced(data, () => {
  const value = data.value || []
  const newItems = []

  for (let i = 0; i < Math.min(10, value.length); i++) {
    const item = value[i]

    newItems.push({
      country: item.ClientCountryOrRegion,
      count: item.count_,
    })
  }

  items.value = newItems
}, { debounce: 100, maxWait: 200 })

const items = ref([])
</script>

<template>
  <VCard height="400">
    <VCardText>
      <h6 class="text-h6">
        Most Frequent Users Location
      </h6>
      <hr class="my-3">
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
