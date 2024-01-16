<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import MoreBtn from '@/@core/components/MoreBtn.vue'
import axios from '@axios'

const props = defineProps({
  search: String,
})

const users = ref()

const headers = [
  { title: 'EMAIL', key: 'email' },
  { title: 'FIRSTNAME', key: 'first_name' },
  { title: 'LASTNAME', key: 'last_name' },
  { title: 'CONTACT', key: 'contact_number' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'ACTION', key: 'action' },
]

const getUsers = async () => {
  try {
    const response = await axios.get('/users/get_users/')

    users.value = response.data
    users.value = users.value.filter(user => !user.is_admin)

    // users.value = response.data
  }
  catch (error) {
    console.error('Login error:', error)
  }
}

getUsers()
</script>

<template>
  <VDataTable
    :headers="headers"
    :items="users"
    :items-per-page="12"
    :search="props.search"
  >
    <template #item.action="{ item }">
      <MoreBtn
        :menu-list="[
          'Send a Reset Password Email',
          'Delete',
        ]"
      />
    </template>
  </VDataTable>
</template>
