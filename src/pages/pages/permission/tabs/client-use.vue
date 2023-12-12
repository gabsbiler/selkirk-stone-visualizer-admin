<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import MoreBtn from '@/@core/components/MoreBtn.vue'

const props = defineProps({
  search: String,
})

const tableContent = ref([
  {
    id: 1,
    first_name: 'Alex',
    last_name: 'Grimaldo',
    contact: '+639121231234',
    email: 'alex@mailservice.com',
    address: 'Ontario, Canada',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
  },
  {
    id: 2,
    first_name: 'Sam',
    last_name: 'Johnson',
    contact: '+639121231235',
    email: 'sam@site.com',
    address: 'Vancouver, Canada',
    photo: 'https://example.com/photo2.png',
  },
  {
    id: 3,
    first_name: 'Lily',
    last_name: 'Evans',
    contact: '+639121231236',
    email: 'lily@domain.com',
    address: 'Montreal, Canada',
    photo: 'https://example.com/photo3.png',
  },
  {
    id: 4,
    first_name: 'Robert',
    last_name: 'Smith',
    contact: '+639121231237',
    email: 'robert@provider.com',
    address: 'Quebec City, Canada',
    photo: 'https://example.com/photo4.png',
  },
  {
    id: 5,
    first_name: 'Emily',
    last_name: 'Davis',
    contact: '+639121231238',
    email: 'emily@service.net',
    address: 'Calgary, Canada',
    photo: 'https://example.com/photo5.png',
  },
])

const headers = [
  { title: 'EMAIL', key: 'email' },
  { title: 'FIRSTNAME', key: 'first_name' },
  { title: 'LASTNAME', key: 'last_name' },
  { title: 'CONTACT', key: 'contact' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'ACTION', key: 'action' },
]
</script>

<template>
  <VDataTable
    :headers="headers"
    :items="tableContent"
    :items-per-page="12"
    :search="search"
    show-select
  >
    <template #item.action="{ item }">
      <MoreBtn :menu-list="['Send a Reset Password Email', 'Delete']" />
    </template>
  </VDataTable>
</template>
