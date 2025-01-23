<script setup lang="ts">
import Loading from '@/layouts/components/Loading.vue'
import SnackBar from '@/layouts/components/SnackBar.vue'
import axios from '@axios'
import { VDataTable } from 'vuetify/components'

const props = defineProps({
  search: String,
})

const SnackBarRef = ref(null)
const isDialogVisible = ref(false)
const isAddDialogVisible = ref(false)
const selectedUser = ref()
const users = ref()
const isEditLoading = ref(false)
const isDeleteLoading = ref(false)
const isAddLoading = ref(false)
const toDelete = ref()
const deletePrompt = ref(false)
const loading = ref(false)
const LoadingRef = ref()

const headers = [
  { title: 'USER', key: 'first_name' },
  { title: 'EMAIL', key: 'email' },
  { title: 'PERMISSION', key: 'permissions' },
  { title: 'ACTION', key: 'action', align: 'end' },
]

const addUser = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  contact_number: '',
  address: '',
  is_admin: true,
  profile_picture: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABfSURBVDiNY/z//z8DUWAR4wOG/wzyKGKMDA+ZiNPNwIChGSpGvAE4wMAbwIJV9DAHZoCR5AIiNeM2gAQw8AawkBJg2F1AgWaIARSCwWAAI8NDLOJ/MERYGDHFGBkeAgBjFBRvsGT1gAAAAABJRU5ErkJggg==',
  permissions: {
    is_administrator: false,
    is_content_managing: false,
    is_support: false,
    is_analytics: false,
    is_product_managing: false,
  },
})

const selectUser = (user: unknown) => {
  selectedUser.value = user
  isDialogVisible.value = true

  // console.log(user)
}

const deleteUser = async () => {
  deletePrompt.value = false
  isDeleteLoading.value = true
  try {
    const response = await axios.delete(`/users/get-users/${selectedUser.value.id}/`)

    SnackBarRef.value.show('success', 'User Deleted Succesfully')
    isDialogVisible.value = false
    await getUsers()
  }
  catch (error) {
    console.error('Deletion error:', error)
    SnackBarRef.value.show('error', `Deletion error: ${error}`)
    isDialogVisible.value = false
  }
  isDeleteLoading.value = false
}

const getUsers = async () => {
  LoadingRef.value.triggerDialog(true)
  try {
    const response = await axios.get('/users/get-users/')

    users.value = response.data
    users.value = users.value.filter((user: { is_admin: boolean }) => user.is_admin)
  }
  catch (e) {
    console.log(e)
  }
  finally {
    LoadingRef.value.triggerDialog(false)
  }
}

const updateUser = async () => {
  isEditLoading.value = true
  try {
    const response = await axios.patch(`/users/get-users/${selectedUser.value.id}/`, {
      address: selectedUser.value.address,
      contact_number: selectedUser.value.contact_number,
      email: selectedUser.value.email,
      first_name: selectedUser.value.first_name,
      last_name: selectedUser.value.last_name,
      permissions: {
        is_administrator: selectedUser.value.permissions.is_administrator,
        is_analytics: selectedUser.value.permissions.is_analytics,
        is_content_managing: selectedUser.value.permissions.is_content_managing,
        is_product_managing: selectedUser.value.permissions.is_product_managing,
        is_support: selectedUser.value.permissions.is_support,
      },
    })

    SnackBarRef.value.show('success', 'User Updated Succesfully')
    isDialogVisible.value = false
    getUsers()
  }
  catch (error) {
    console.error('Update error:')
    SnackBarRef.value.show('success', error.response.message)
  }
  isEditLoading.value = false
}

const registerUser = async () => {
  isAddLoading.value = true
  try {
    console.log(addUser.value)

    const response = await axios.post('/users/register/', addUser.value)

    SnackBarRef.value.show('success', 'User Added Succesfully')
    isAddDialogVisible.value = false
    getUsers()
  }
  catch (error) {
    SnackBarRef.value.show('error', error.response.data.error)
    console.error('Signup error:', error.response)
    isAddDialogVisible.value = false
  }
  isAddLoading.value = false
}

const openAddDialog = () => {
  isAddDialogVisible.value = true
}

defineExpose({ openAddDialog })

onMounted(() => {
  getUsers()
})
</script>

<template>
  <section>
    <VDataTable
      :headers="headers"
      :items="users"
      :search="props.search"
      :loading="loading"
    >
      <template v-slot:item="{item}">
        <tr>
          <td>{{ item.first_name }}</td>
          <td>{{ item.email }}</td>
          <td class="v-data-table__td v-data-table-column--align-end">
            <span
              v-for="(value, key) in item.permissions"
              :key="key"
            >
              <VIcon
                v-if="key.toString() === 'is_administrator' && value === true"
                icon="bx-user"
                :class="key"
              />
              <VIcon
                v-if="key.toString() === 'is_analytics' && value === true"
                icon="bx-stats"
                :class="key"
              />
              <VIcon
                v-if="key.toString() === 'is_support' && value === true"
                icon="bx-headphone"
                :class="key"
              />
              <VIcon
                v-if="key.toString() === 'is_product_managing' && value === true"
                icon="bx-box"
                :class="key"
              />
              <VIcon
                v-if="key.toString() === 'is_content_managing' && value === true"
                icon="bx-edit"
                :class="key"
              />
            </span>
          </td>
          <td>
            <div class="flex-center">
              <VBtn
                variant="text"
                size="small"
                @click="() => selectUser(item)"
              >
                Edit
              </VBtn>
            </div>
          </td>
        </tr>
      </template>
    </VDataTable>

    <Loading ref="LoadingRef" />

    <!-- Edit User -->
    <VDialog
      v-model="isDialogVisible"
      max-width="500"
    >
      <VCard>
        <VCardText style="padding: 2rem;">
          <VForm>
            <VRow class="mb-3">
              <VCol cols="6">
                <VTextField
                  v-model="selectedUser.raw.first_name"
                  label="First Name"
                />
              </VCol>
              <VCol cols="6">
                <VTextField
                  v-model="selectedUser.raw.last_name"
                  label="Last Name"
                />
              </VCol>
              <VCol cols="12">
                <VTextField
                  v-model="selectedUser.raw.email"
                  label="Email"
                  disabled
                />
              </VCol>
            </VRow>
            <span class="text-h6">
              Permission
            </span>
            <VRow class="mt-1">
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="administrator"
                  v-model="selectedUser.raw.permissions.is_administrator"
                />
                <VLabel for="administrator">
                  Administrator
                </VLabel>
              </VCol>
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="analytics"
                  v-model="selectedUser.raw.permissions.is_analytics"
                />
                <VLabel for="analytics">
                  Analytics
                </VLabel>
              </VCol>
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="content_managing"
                  v-model="selectedUser.raw.permissions.is_content_managing"
                />
                <VLabel for="content_managing">
                  Content Managing
                </VLabel>
              </VCol>
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="product_managing"
                  v-model="selectedUser.raw.permissions.is_product_managing"
                />
                <VLabel for="product_managing">
                  Product Managing
                </VLabel>
              </VCol>
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="support"
                  v-model="selectedUser.raw.permissions.is_support"
                />
                <VLabel for="support">
                  Support
                </VLabel>
              </VCol>
            </VRow>

            <div
              class="d-flex mt-5"
              style="justify-content: space-between;"
            >
              <div>
                <VBtn
                  color="error"
                  variant="outlined"
                  :loading="isDeleteLoading"
                  @click="deletePrompt = true"
                >
                  Delete
                </VBtn>
              </div>
              <div class="d-flex  gap-x-3">
                <VBtn
                  variant="outlined"
                  @click="isDialogVisible = false"
                >
                  Back
                </VBtn>
                <VBtn
                  variant="outlined"
                  :loading="isEditLoading"
                  @click="updateUser"
                >
                  Save Changes
                </VBtn>
              </div>
            </div>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>

    <!-- Add User -->
    <VDialog
      v-model="isAddDialogVisible"
      max-width="600"
    >
      <VCard title="Add User">
        <VCardText>
          <VForm @submit.prevent="registerUser">
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="addUser.first_name"
                  label="First Name"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="addUser.last_name"
                  label="Last Name"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="addUser.contact_number"
                  label="Contact Number"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="addUser.address"
                  label="Address"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VTextField
                  v-model="addUser.email"
                  label="Email"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="addUser.password"
                  label="Password"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="addUser.password_confirmation"
                  label="Confirm Password"
                />
              </VCol>
            </VRow>
            <!--
              <VRow>
              <VCol cols="12">
              <VFileInput
              v-model="addUser.profile_picture"
              label="Avatar Upload"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="bx-camera"
              />
              </VCol>
              </VRow>
            -->
            <VRow>
              <VCol>
                <h6 class="text-h6">
                  Permission
                </h6>
              </VCol>
            </VRow>
            <VRow class="mt-1">
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="administrator"
                  v-model="addUser.permissions.is_administrator"
                />
                <VLabel for="administrator">
                  Administrator
                </VLabel>
              </VCol>
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="analytics"
                  v-model="addUser.permissions.is_analytics"
                />
                <VLabel for="analytics">
                  Analytics
                </VLabel>
              </VCol>
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="content_managing"
                  v-model="addUser.permissions.is_content_managing"
                />
                <VLabel for="content_managing">
                  Content Managing
                </VLabel>
              </VCol>
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="product_managing"
                  v-model="addUser.permissions.is_product_managing"
                />
                <VLabel for="product_managing">
                  Product Managing
                </VLabel>
              </VCol>
              <VCol
                class="d-flex align-center"
                cols="4"
              >
                <VCheckboxBtn
                  id="support"
                  v-model="addUser.permissions.is_support"
                />
                <VLabel for="support">
                  Support
                </VLabel>
              </VCol>
            </VRow>
            <VRow>
              <VCol class="d-flex justify-end gap-x-2">
                <VBtn
                  variant="outlined"
                  @click="isAddDialogVisible = false"
                >
                  Cancel
                </VBtn>
                <VBtn
                  type="submit"
                  :loading="isAddLoading"
                >
                  Submit
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VDialog>

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
            @click="deleteUser"
          >
            Confirm
          </VBtn>

          <VBtn
            color="secondary"
            variant="tonal"
          >
            Cancel
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <SnackBar ref="SnackBarRef" />
  </section>
</template>

<style lang="scss">
.is_administrator{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #FF66661F;
  color: #DF3333;
  margin-inline: .3rem;
}

.is_analytics{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #72E1281F;
  color: #71DD37;
  margin-inline: .3rem;
}

.is_content_managing{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #C4C4C44D;
  color: #7E7E7E;
  margin-inline: .3rem;
}

.is_product_managing{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #FDB5281F;
  color: #D8BF3A;
  margin-inline: .3rem;
}

.is_support{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #5F27261A;
  color: #5F2726;
  margin-inline: .3rem;
}
</style>
