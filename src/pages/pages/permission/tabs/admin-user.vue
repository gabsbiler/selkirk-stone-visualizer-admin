<script setup lang="ts">
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
</script>

<template>
  <VTable
    class="text-no-wrap"
    style="max-block-size: 86vh;"
  >
    <thead>
      <tr>
        <th scope="col">
          User
        </th>
        <th scope="col">
          Email
        </th>
        <th scope="col">
          Permission
        </th>
        <th
          scope="col"
          class="text-center"
        >
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="content in tableContent"
        :key="content.name"
      >
        <td>{{ content.name }}</td>
        <td>{{ content.email }}</td>
        <td
          class="d-flex"
          style="align-items: center;"
        >
          <span
            v-for="(value, key) in content.permission"
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
        </td>
        <td>
          <div style="display: flex; align-items: center; justify-content: center;">
            <VBtn
              variant="text"
              size="small"
            >
              Edit
            </VBtn>
          </div>
        </td>
      </tr>
    </tbody>
  </VTable>
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
