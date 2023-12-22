<script setup lang="ts">
import AdminUser from './tabs/admin-user.vue'
import ClientUser from './tabs/client-use.vue'

const permissionTab = ref()
const search = ref()

const tabs = [
  { icon: 'bx-lock-alt', title: 'admin user permission' },
  { icon: 'bx-user', title: 'client management' },
]
</script>

<template>
  <section>
    <VCard>
      <VCardItem>
        <VRow>
          <VCol>
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
          </VCol>
          <VCol
            cols="12"
            md="5"
            class="d-flex gap-x-2"
          >
            <VTextField
              v-model="search"
              density="compact"
              label="Search"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              dense
              outlined
            />
          </VCol>
        </VRow>

        <VWindow
          v-model="permissionTab"
          class="mt-6"
        >
          <VWindowItem>
            <AdminUser :search="search" />
          </VWindowItem>

          <VWindowItem>
            <ClientUser :search="search" />
          </VWindowItem>
        </VWindow>
      </VCardItem>
    </VCard>
  </section>
</template>
