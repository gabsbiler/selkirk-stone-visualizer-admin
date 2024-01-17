<script setup lang="ts">
import SnackBar from '../SnackBar.vue'
import CategoryColors from '@/layouts/components/category/CategoryColors.vue'
import CategoryColorVariantAddDialog from '@/layouts/components/category/CategoryColorVariantAdd.vue'
import axios from '@axios'

const selectedStone = ref()
const isDialogOpen = ref(false)
const CategoryVariantAddRef = ref(null)
const deleteLoader = ref(false)
const applyLoader = ref(false)
const snackbarRef = ref(null)

const openDialog = (status: boolean, stone: any) => {
  isDialogOpen.value = status
  selectedStone.value = stone
  sessionStorage.setItem('stoneID', selectedStone.value.id)
}

defineExpose({ openDialog })

const openVariantAddDialog = () => {
  CategoryVariantAddRef.value.openAddDialog()
}

const deleteCategory = async () => {
  deleteLoader.value = true
  try {
    const response = await axios.delete(`/products/${sessionStorage.getItem('stoneID')}/`)

    snackbarRef.value.show('success', response.data)
    console.log(response)
    deleteLoader.value = false
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  catch (error) {
    console.error('Error adding product:', error)

    snackbarRef.value.show('error', `Error adding product: ${error.message}`)
    deleteLoader.value = false
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
}

const applyChanges = () => {
  applyLoader.value = true
  setTimeout(() => {
    console.log('Apply changes')
    applyLoader.value = false
  }, 3000)
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    width="800"
    height="900"
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
              @click="openVariantAddDialog"
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
            <CategoryColors :stone-variant="stoneVariant" />
          </VCol>
        </VRow>
        <VRow>
          <VCol class="d-flex gap-x-2">
            <VBtn
              variant="text"
              color="error"
              :loading="deleteLoader"
              @click="deleteCategory"
            >
              Delete
            </VBtn>
            <VSpacer />
            <VBtn
              variant="outlined"
              @click="isDialogOpen = false"
            >
              Cancel
            </VBtn>
            <VBtn
              :loading="applyLoader"
              variant="outlined"
              @click="applyChanges"
            >
              Apply Changes
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <CategoryColorVariantAddDialog ref="CategoryVariantAddRef" />
    <SnackBar ref="snackbarRef" />
  </VDialog>
</template>
