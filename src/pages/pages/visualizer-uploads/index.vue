<script setup lang="ts">
import axiosIns from '@/plugins/axios'
import { VDataTable } from 'vuetify/labs/VDataTable'

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Uploads', key: 'raw_image' },
  { title: 'Visualized', key: 'edited_image' },
  { title: 'Date Uploaded', key: 'uploaded_at' },
]

const data = ref()

const fetchData = async () => {
  try {
    const response = await axiosIns.get('/viz-image/images/')

    data.value = response.data
    console.log(response.data)
  }
  catch (e) {
    console.log(e)
  }
}

function truncate(str, maxlength) {
  if (str) {
    return (str.length > maxlength)
      ? `${str.slice(0, maxlength - 1)}…`
      : str
  }
  else {
    return ''
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <VCard>
      <VCardText>
        <VDataTable
          :headers="headers"
          :items="data"
        >
          <template #item.raw_image="{ item }">
            <a
              :href="item.raw.raw_image"
              target="_blank"
            >{{ truncate(item.raw.raw_image, 30) }}</a>
          </template>

          <template #item.edited_image="{ item }">
            <a
              :href="item.raw.raw_image"
              target="_blank"
            >{{ truncate(item.raw.edited_image, 30) }}</a>
          </template>
        </VDataTable>
      </VCardText>
    </VCard>
  </div>
</template>
