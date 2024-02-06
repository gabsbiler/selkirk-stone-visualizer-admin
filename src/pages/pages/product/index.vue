<script setup lang="ts">
import Category from '@/layouts/components/category/Category.vue'
import CategoryAddDialog from '@/layouts/components/category/CategoryAddDialog.vue'
import axios from '@axios'

const stones = ref([])
const categoryRef = ref(null)
const addDialogRef = ref(null)

const editStone = (stone: any) => {
  categoryRef.value.openDialog(true, stone)
}

const addStone = () => {
  addDialogRef.value.openDialog()
}

const getProducts = async () => {
  const response = await axios.get('/products/')

  stones.value = response.data
}

onMounted(() => {
  getProducts()
})
</script>

<template>
  <section>
    <VCard>
      <VCardText>
        <VRow>
          <VCol class="d-flex">
            <h3 class="text-h4 text-primary">
              Stone Category
            </h3>
          </VCol>

          <VCol class="d-flex gap-x-2 justify-end">
            <!-- <VBtn>Show</VBtn> -->
            <!-- <VBtn>Hide</VBtn> -->
            <!-- <VBtn>Delete</VBtn> -->
            <VBtn @click="addStone">
              Add Category
            </VBtn>
          </VCol>
        </VRow>
        <VRow v-if="stones.length > 0">
          <VCol
            v-for="stone in stones"
            :key="stone.name"
            :style="{ 'inline-size': '100%', 'max-inline-size': '30rem', 'opacity': stone.status ? '100%' : '70%', 'min-inline-size': '20rem' }"
          >
            <VCard>
              <VImg
                :src="stone.image"
                height="200"
                cover
              />

              <VCardItem>
                <VCardTitle>{{ stone.name }}</VCardTitle>
                <div
                  v-if="!stone.isInStock"
                  class="text-error"
                >
                  Out of Stock
                </div>
              </VCardItem>

              <VCardText>
                <div class="d-flex">
                  <VBtn @click="editStone(stone)">
                    Edit
                  </VBtn>
                  <VSpacer />
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
        <VRow v-else>
          <VCol
            v-for="item in 3"
            :key="item"
            :style="{ 'inline-size': '100%', 'max-inline-size': '30rem', 'min-inline-size': '20rem' }"
          >
            <VCard>
              <PuSkeleton height="200px" />
              <VCardItem>
                <PuSkeleton height="25px" />
              </VCardItem>

              <VCardText>
                <div class="d-flex justify-space-between">
                  <PuSkeleton
                    height="40px"
                    width="90px"
                  />
                  <PuSkeleton
                    height="40px"
                    width="50px"
                  />
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Category Dialog -->
    <Category ref="categoryRef" />

    <CategoryAddDialog ref="addDialogRef" />
  </section>
</template>
