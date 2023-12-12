<script setup lang="ts">
import AdminUser from './tabs/admin-user.vue'

const permissionTab = ref()

const tabs = [
  { icon: 'bx-lock-alt', title: 'admin user permission' },
  { icon: 'bx-user', title: 'client management' },
]
</script>

<template>
  <section>
    <VCard>
      <VCardItem>
        <VTabs
          v-model="permissionTab"
          class="v-tabs-pill"
        >
          <VTab
            v-for="tab in tabs"
            :key="tab.icon"
          >
            <VIcon
              start
              :size="20"
              :icon="tab.icon"
            />
            <span>{{ tab.title }}</span>
          </VTab>
        </VTabs>

        <VWindow
          v-model="permissionTab"
          class="mt-6"
        >
          <VWindowItem>
            <AdminUser />
          </VWindowItem>

          <VWindowItem>
            ClientTable
          </VWindowItem>
        </VWindow>
      </VCardItem>
    </VCard>
  </section>
</template>
