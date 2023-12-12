<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  search: String,
})

const tableContent = ref([
  {
    id: 1,
    name: 'Alex',
    email: 'alex@mailservice.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 2,
    name: 'Sam',
    email: 'sam@site.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 3,
    name: 'Chris',
    email: 'chris@netmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 4,
    name: 'Jordan',
    email: 'jordan@site.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 5,
    name: 'Taylor',
    email: 'taylor@post.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 6,
    name: 'Morgan',
    email: 'morgan@webmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 7,
    name: 'Casey',
    email: 'casey@mail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 8,
    name: 'Jamie',
    email: 'jamie@inbox.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 9,
    name: 'Riley',
    email: 'riley@email.net',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 10,
    name: 'Cameron',
    email: 'cameron@netmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 11,
    name: 'Alex',
    email: 'alex@mailservice.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 12,
    name: 'Sam',
    email: 'sam@site.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 13,
    name: 'Chris',
    email: 'chris@netmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 14,
    name: 'Jordan',
    email: 'jordan@site.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 15,
    name: 'Taylor',
    email: 'taylor@post.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 16,
    name: 'Morgan',
    email: 'morgan@webmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 17,
    name: 'Casey',
    email: 'casey@mail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 18,
    name: 'Jamie',
    email: 'jamie@inbox.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 19,
    name: 'Riley',
    email: 'riley@email.net',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 20,
    name: 'Cameron',
    email: 'cameron@netmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 21,
    name: 'Alex',
    email: 'alex@mailservice.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 22,
    name: 'Sam',
    email: 'sam@site.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 23,
    name: 'Chris',
    email: 'chris@netmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 24,
    name: 'Jordan',
    email: 'jordan@site.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 25,
    name: 'Taylor',
    email: 'taylor@post.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 26,
    name: 'Morgan',
    email: 'morgan@webmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 27,
    name: 'Casey',
    email: 'casey@mail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 28,
    name: 'Jamie',
    email: 'jamie@inbox.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 29,
    name: 'Riley',
    email: 'riley@email.net',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
  {
    id: 30,
    name: 'Cameron',
    email: 'cameron@netmail.com',
    photo: 'https://static.vecteezy.com/system/resources/previews/021/276/728/original/cute-cow-cow-illustration-baby-cow-animal-illustration-png.png',
    permission: {
      administrator: true,
      content_managing: true,
      support: true,
      analytics: true,
      product_managing: true,
    },
  },
])

const isDialogVisible = ref(false)
const selectedUser = ref()

const headers = [
  { title: 'USER', key: 'name' },
  { title: 'EMAIL', key: 'email' },
  { title: 'PERMISSION', key: 'permission' },
  { title: 'ACTION', key: 'action' },
]

const selectUser = (user: unknown) => {
  selectedUser.value = user
  isDialogVisible.value = true
}

const deleteUser = (id: number) => {
  tableContent.value = tableContent.value.filter(user => user.id !== id)
}
</script>

<template>
  <VDataTable
    :headers="headers"
    :items="tableContent"
    :search="props.search"
    :items-per-page="10"
    show-select
  >
    <template #item.permission="{ item }">
      <span
        v-for="(value, key) in item.props.title.permission"
        :key="key"
      >
        <VIcon
          v-if="key === 'administrator' && value === true"
          icon="bx-user"
          :class="key"
        />
        <VIcon
          v-if="key === 'analytics' && value === true"
          icon="bx-stats"
          :class="key"
        />
        <VIcon
          v-if="key === 'support' && value === true"
          icon="bx-headphone"
          :class="key"
        />
        <VIcon
          v-if="key === 'product_managing' && value === true"
          icon="bx-box"
          :class="key"
        />
        <VIcon
          v-if="key === 'content_managing' && value === true"
          icon="bx-edit"
          :class="key"
        />
      </span>
    </template>

    <template #item.action="{ item }">
      <div class="flex-center">
        <VBtn
          variant="text"
          size="small"
          @click="() => selectUser(item)"
        >
          Edit
        </VBtn>
      </div>
    </template>
  </VDataTable>

  <VDialog
    v-model="isDialogVisible"
    max-width="500"
  >
    <VCard>
      <VCardText style="padding: 2rem;">
        <VForm>
          <VRow class="mb-3">
            <VCol cols="12">
              <VTextField
                v-model="selectedUser.raw.name"
                label="Name"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="selectedUser.raw.email"
                label="Email"
              />
            </VCol>
            <VCol cols="12">
              <VFileInput
                label="Avatar Upload"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="bx-camera"
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
                v-model="selectedUser.raw.permission.administrator"
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
                v-model="selectedUser.raw.permission.analytics"
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
                v-model="selectedUser.raw.permission.content_managing"
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
                v-model="selectedUser.raw.permission.product_managing"
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
                v-model="selectedUser.raw.permission.support"
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
                @click="deleteUser(selectedUser.raw.id)"
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
              <VBtn>
                Save Changes
              </VBtn>
            </div>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.administrator{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #FF66661F;
  color: #DF3333;
  margin-inline: .3rem;
}

.analytics{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #72E1281F;
  color: #71DD37;
  margin-inline: .3rem;
}

.content_managing{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #C4C4C44D;
  color: #7E7E7E;
  margin-inline: .3rem;
}

.product_managing{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #FDB5281F;
  color: #D8BF3A;
  margin-inline: .3rem;
}

.support{
  padding: .3rem;
  border-radius: 1rem;
  aspect-ratio: 1/1;
  background-color: #5F27261A;
  color: #5F2726;
  margin-inline: .3rem;
}
</style>
