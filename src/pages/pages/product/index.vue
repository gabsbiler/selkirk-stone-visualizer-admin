<script setup lang="ts">
const stones = ref([
  {
    name: 'Aged Brick',
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1586124262679-KTNBSUBHCVC4URM4U81J/Aged+Brick+-+Oxford.jpg?format=2500w',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Ashen',
        image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1586290067419-1T5MSQ7HSG7P542ZSJEQ/14_SelkirkStone_7032A.jpg?format=2500w',
        show: true,
      },
      {
        name: 'Bisque',
        image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1685055560123-0VH7T9PNU0955U0EKSYK/Aged+Brick+-+Bisque.jpg?format=2500w',
        show: true,
      },
      {
        name: 'Brownstone',
        image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1586124170265-K7YCMQSTRXF1SC6F0Y07/Aged+Brick+-+Brownstone.jpg?format=2500w',
        show: true,
      },
    ],
  },
  {
    name: 'Country Cliffstone',
    image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1577389258722-20L7LG2SSX1CLYCMURUF/Selkirk-Stone-Country-Cliffstone-Montana-Slate.jpg?format=2500w',
    status: true,
    isInStock: true,
    colors: [
      {
        name: 'Alabaster',
        image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1685057868631-9V6BE7H1WC8F8X976IX8/Country+Cliffstone+-+Alabaster.jpg?format=2500w',
        show: true,
      },
      {
        name: 'Alabaster',
        image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1685057868631-9V6BE7H1WC8F8X976IX8/Country+Cliffstone+-+Alabaster.jpg?format=2500w',
        show: true,
      },
      {
        name: 'Alabaster',
        image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1685057868631-9V6BE7H1WC8F8X976IX8/Country+Cliffstone+-+Alabaster.jpg?format=2500w',
        show: true,
      },
      {
        name: 'Alabaster',
        image: 'https://images.squarespace-cdn.com/content/v1/5df2e96175170a0bfdc2f31c/1685057868631-9V6BE7H1WC8F8X976IX8/Country+Cliffstone+-+Alabaster.jpg?format=2500w',
        show: true,
      },
    ],
  },
])

const selectedStone = ref()
const selectedStoneVariant = ref()
const isEditCategoryDialogOpen = ref(false)

const isEditStoneVariantDialogOpen = ref(false)

const editStone = (stoneSelected: any) => {
  selectedStone.value = stoneSelected
  isEditCategoryDialogOpen.value = true
}

const editVariant = (variant: any) => {
  selectedStoneVariant.value = variant
  isEditStoneVariantDialogOpen.value = true
}
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
            <VBtn>Show</VBtn>
            <VBtn>Hide</VBtn>
            <VBtn>Delete</VBtn>
          </VCol>
        </VRow>
        <VRow>
          <VCol
            v-for="stone in stones"
            :key="stone.name"
            :style="{ 'inline-size': '100%', 'max-inline-size': '30rem', 'opacity': stone.status ? '100%' : '70%' }"
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
                  <VBtn
                    icon="mdi-trash-can-outline"
                    variant="text"
                  />
                </div>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Category Dialog -->
    <VDialog
      v-model="isEditCategoryDialogOpen"
      width="700"
    >
      <VCard>
        <VCardText>
          <VRow>
            <VCol cols="6">
              <VImg :src="selectedStone.image" />
            </VCol>
            <VCol>
              <VTextField
                v-model="selectedStone.name"
                label="Label"
              />
              <VRadioGroup
                v-model="selectedStone.isInStock"
                inline
              >
                <VRadio
                  label="In Stock"
                  :value="true"
                />
                <VRadio
                  label="Out of Stock"
                  :value="false"
                />
              </VRadioGroup>
            </VCol>
          </VRow>
          <VDivider class="my-3" />
          <VRow>
            <VCol class="d-flex align-center">
              <h6 class="text-h6">
                Available Stone Color
              </h6>
              <VSpacer />
              <VBtn
                color="primary"
                variant="text"
              >
                <VIcon
                  start
                  icon="mdi-plus"
                />
                Add
              </VBtn>
            </VCol>
          </VRow>
          <VRow>
            <VCol
              v-for="stoneVariant in selectedStone.colors"
              :key="stoneVariant.name"
              cols="12"

              md="6"
              sm="4"
            >
              <div class="d-flex align-center">
                <VCheckbox v-model="stoneVariant.show" />
                <div class="d-flex align-center gap-x-1">
                  <div>
                    <VImg
                      :width="50"
                      :height="30"
                      aspect-ratio="16/9"
                      cover
                      :src="stoneVariant.image"
                      style="border-radius: 5px;"
                    />
                  </div>
                  {{ stoneVariant.name }}
                  <VBtn
                    icon="mdi-note-edit-outline"
                    variant="text"
                    size="x-small"
                    @click="editVariant(stoneVariant)"
                  />
                </div>
              </div>
            </VCol>
          </VRow>
          <VRow>
            <VCol class="d-flex gap-x-2">
              <VSpacer />
              <VBtn
                variant="outlined"
                @click="isEditCategoryDialogOpen = false"
              >
                Cancel
              </VBtn>
              <VBtn>
                Apply Changes
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>

    <VDialog
      v-model="isEditStoneVariantDialogOpen"
      class="v-dialog-sm"
    >
      <VCard title="Edit Stone Color">
        <VCardText>
          <VRow>
            <VCol>
              <VImg
                :height="150"
                aspect-ratio="16/9"
                cover
                :src="selectedStoneVariant.image"
                style="border-radius: 5px;"
              />
            </VCol>
            <VCol class="d-flex align-center">
              <VTextField
                v-model="selectedStoneVariant.name"
                label="Stone Color Name"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol class="d-flex gap-x-2">
              <VSpacer />
              <VBtn
                variant="outlined"
                @click="isEditStoneVariantDialogOpen = false"
              >
                Cancel
              </VBtn>
              <VBtn>
                Save
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
  </section>
</template>
