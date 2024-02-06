<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import axios from '@axios'

const props = defineProps({
  search: String,
})

const users = ref()

const headers = [
  { title: 'USER', key: 'first_name' },
  { title: 'EMAIL', key: 'email' },
  { title: 'PERMISSION', key: 'permissions' },
  { title: 'ACTION', key: 'action' },
]

const getUsers = async () => {
  const response = await axios.get('/users/get-users/')

  users.value = response.data
  users.value = users.value.filter((user: { is_admin: boolean }) => user.is_admin)
}

onMounted(() => {
  getUsers()
})
</script>

<template>
  <div>
    <VDataTable
      :headers="headers"
      :items="users"
      :search="props.search"
    >
      <template #item.permissions="{ item }">
        <span
          v-for="(value, key) in item.props.title.permissions"
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
      </template>

      <template #item.action>
        <div class="flex-center">
          <VBtn
            variant="text"
            size="small"
          >
            Edit
          </VBtn>
        </div>
      </template>
    </VDataTable>
  </div>
</template>
