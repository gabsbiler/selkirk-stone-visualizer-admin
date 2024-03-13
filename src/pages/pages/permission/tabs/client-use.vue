<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import Loading from '@/layouts/components/Loading.vue'
import SnackBar from '@/layouts/components/SnackBar.vue'
import axios from '@axios'

const props = defineProps({
  search: String,
})

const users = ref()
const SnackBarRef = ref()
const LoadingRef = ref()

const headers = [
  { title: 'EMAIL', key: 'email' },
  { title: 'FIRSTNAME', key: 'first_name' },
  { title: 'LASTNAME', key: 'last_name' },
  { title: 'CONTACT', key: 'contact_number' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'ACTION', key: 'action', width: 150, align: 'center' },
]

const getUsers = async () => {
  LoadingRef.value.triggerDialog(true)
  try {
    const response = await axios.get('/users/get-users/')

    users.value = response.data
    users.value = users.value.filter(user => !user.is_admin)

    // users.value = response.data
  }
  catch (error) {
    console.error('Login error:', error)
  }
  finally {
    LoadingRef.value.triggerDialog(false)
  }
}

const deleteUsers = async (id: number) => {
  LoadingRef.value.triggerDialog(true)
  try {
    const response = await axios.delete(`/users/get-users/${id}/`)

    console.log(response.data)
    getUsers()
  }
  catch (error) {
    console.error('Delete Error: ', error)
  }
  finally {
    LoadingRef.value.triggerDialog(false)
  }
}

const resendVerificationEmail = async (email: string) => {
  LoadingRef.value.triggerDialog(true)
  try {
    const response = await axios.post('/users/verify-email/', {
      email,
    })

    console.log(response.data)
    SnackBarRef.value.show('success', 'Email Verification is sent succesfully')
  }
  catch (error) {
    console.error('Reverification Failed: ', error)
    SnackBarRef.value.show('error', 'Reverification Failed')
  }
  finally {
    LoadingRef.value.triggerDialog(false)
  }
}

const sendResetPassword = async (email: string) => {
  LoadingRef.value.triggerDialog(true)
  try {
    const response = await axios.post('/users/reset-password/', {
      email,
    })

    console.log(response.data)
    SnackBarRef.value.show('success', 'Reset Password is sent succesfully')
  }
  catch (error) {
    console.error('Reverification Failed: ', error)
    SnackBarRef.value.show('error', 'Reset Password Failed')
  }
  finally {
    LoadingRef.value.triggerDialog(false)
  }
}

onMounted(async () => {
  await getUsers()
})
</script>

<template>
  <div>
    <VDataTable
      :headers="headers"
      :items="users"
      :items-per-page="12"
      :search="props.search"
    >
      <template #item.action="{ item }">
        <div>
          <VTooltip text="Send Reset Password">
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                icon="mdi-lock-reset"
                density="compact"
                variant="text"
                @click="sendResetPassword(item.raw.email)"
              />
            </template>
          </VTooltip>
          <VTooltip text="Email Verification">
            <template #activator="{ props }">
              <VBtn
                v-bind="props"
                icon="mdi-email"
                density="compact"
                variant="text"
                @click="resendVerificationEmail(item.raw.email)"
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
                :loading="isDeleteLoading"
                @click="deleteUsers(item.raw.id)"
              />
            </template>
          </VTooltip>
        </div>
      </template>
    </VDataTable>
    <SnackBar ref="SnackBarRef" />
    <Loading ref="LoadingRef" />
  </div>
</template>
