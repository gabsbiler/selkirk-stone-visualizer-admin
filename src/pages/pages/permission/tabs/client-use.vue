<script setup lang="ts">
import Loading from '@/layouts/components/Loading.vue'
import SnackBar from '@/layouts/components/SnackBar.vue'
import axios from '@axios'
import { VDataTable } from 'vuetify/components'

const props = defineProps({
  search: String,
})

const deletePrompt = ref()
const selectedUser = ref()
const users = ref()
const SnackBarRef = ref()
const LoadingRef = ref()

const headers = [
  { title: 'EMAIL', key: 'email' },
  { title: 'FIRSTNAME', key: 'first_name' },
  { title: 'LASTNAME', key: 'last_name' },
  { title: 'CONTACT', key: 'contact_number' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'ACTION', key: 'action', width: 150, align: 'end' },
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
  deletePrompt.value = false
  LoadingRef.value.triggerDialog(true)
  try {
    const response = await axios.delete(`/users/get-users/${id}/`)

    console.log(response.data)
    SnackBarRef.value.show('success', 'User Deleted Succesfully')
    await getUsers()
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
      <template v-slot:item="{item}">
        <tr>
          <td>{{ item.email }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.contact_number }}</td>
          <td>{{ item.address }}</td>
          <td class="v-data-table__td v-data-table-column--align-end">
            <VTooltip text="Send Reset Password">
              <template #activator="{ props }">
                <VBtn
                  v-bind="props"
                  icon="mdi-lock-reset"
                  density="compact"
                  variant="text"
                  @click="sendResetPassword(item.email)"
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
                  @click="resendVerificationEmail(item.email)"
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
                  @click="() => {
                    selectedUser = item.id
                    deletePrompt = true
                  }"
                />
              </template>
            </VTooltip>
          </td>
        </tr>
      </template>
    </VDataTable>
    <SnackBar ref="SnackBarRef" />
    <Loading ref="LoadingRef" />

    <!-- Delete User Prompt -->
    <VDialog
      v-model="deletePrompt"
      max-width="500"
    >
      <VCard class="text-center px-10 py-6">
        <VCardText>
          <VBtn
            icon
            variant="outlined"
            color="warning"
            class="my-4"
            style=" block-size: 88px;inline-size: 88px; pointer-events: none;"
          >
            <span class="text-5xl">!</span>
          </VBtn>

          <h6 class="text-lg font-weight-medium">
            Are you sure you want to delete this account? This action cannot be undone.
          </h6>
        </VCardText>

        <VCardActions class="align-center justify-center gap-2">
          <VBtn
            variant="elevated"
            @click="deleteUsers(selectedUser)"
          >
            Confirm
          </VBtn>

          <VBtn
            color="secondary"
            variant="tonal"
            @click="deletePrompt = false"
          >
            Cancel
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>
