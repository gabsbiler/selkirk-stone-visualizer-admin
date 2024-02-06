<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
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
    const response = await axios.get('/users/get-users/')

    users.value = response.data
    users.value = users.value.filter(user => !user.is_admin)

    // users.value = response.data
  }
  catch (error) {
    console.error('Login error:', error)
  }
}

const deleteUsers = async (id: number) => {
  try {
    const response = await axios.delete(`/users/get-users/${id}/`)

    console.log(response.data)
    getUsers()
  }
  catch (error) {
    console.error('Delete Error: ', error)
  }
}

const resendVerificationEmail = async (id: number) => {
  try {
    const response = await axios.post(`/users/send-verification_email/${id}/`)

    console.log(response.data)
  }
  catch (error) {
    console.error('Reverification Failed: ', error)
  }
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <VDataTable
    :headers="headers"
    :items="users"
    :items-per-page="12"
    :search="props.search"
  >
    <template #item.action="{ item }">
      <div>
        <VTooltip text="Email Verification">
          <template #activator="{ props }">
            <VBtn
              v-bind="props"
              icon="mdi-email"
              density="compact"
              variant="text"
              @click="resendVerificationEmail(item.raw.id)"
            />
          </template>
        </VTooltip>
        <VTooltip text="Delete User">
          <template #activator="{ props }">
            <VBtn
              v-bind="props"
              icon="mdi-trash"
              density="compact"
              variant="text"
              @click="deleteUsers(item.raw.id)"
            />
          </template>
        </VTooltip>
      </div>
    </template>
  </VDataTable>
</template>
