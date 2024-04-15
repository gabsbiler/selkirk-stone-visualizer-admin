<script setup lang="ts">
const props = defineProps<{
  loading: boolean
  data: object
}>()

const { loading, data } = toRefs(props)

watchDebounced(data, () => {
  const value = data.value || []

  const groupedValue = value.reduce((p, c) => {
    const name = c.ClientBrowser?.split(' ')[0]
    if (!p.hasOwnProperty(name))
      p[name] = 0

    p[name] += c.count_

    return p
  }, {})

  const newItems = []
  const keys = Object.keys(groupedValue)

  for (let i = 0; i < Math.min(10, keys.length); i++) {
    const key = keys[i]

    newItems.push({
      browser: key,
      count: groupedValue[key],
    })
  }

  items.value = newItems
}, { debounce: 100, maxWait: 200 })

const items = ref([])
</script>

<template>
  <VCard
    height="400"
    :loading="loading"
  >
    <VCardText>
      <h6 class="text-h6">
        Most Used Browsers
      </h6>
      <hr class="my-3">
      <div>
        <VTable>
          <thead>
            <tr>
              <th>BROWSER</th>
              <th>USERS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.browser"
            >
              <td>{{ item.browser }}</td>
              <td>{{ item.count }}</td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VCardText>
  </VCard>
</template>
