<script setup lang="ts">
import axiosIns from '@/plugins/axios'
import { VDataTable } from 'vuetify/components'

const headers = [
  { title: 'ID', key: 'id', sortable: false },
  { title: 'Uploads', key: 'raw_image' },
  { title: 'Visualized', key: 'edited_image' },
  { title: 'Date Uploaded', key: 'uploaded_at' },
]

const data = ref()
const loading = ref(false)

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axiosIns.get('/viz-image/images/')

    data.value = response.data.reverse()

    console.log(response.data)
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
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
    <VCard :loading="loading">
      <VCardText>
        <VDataTable
          :headers="headers"
          :items="data"
        >
          <template v-slot:item.raw_image="{ item }">
            <a
              :href="item.raw.raw_image"
              target="_blank"
            >{{ truncate(item.raw.raw_image, 30) }}</a>
          </template>

          <template v-slot:item.edited_image="{ item }">
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
