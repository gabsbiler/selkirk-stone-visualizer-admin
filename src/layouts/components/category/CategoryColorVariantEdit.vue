<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue'
import axios from '@axios'

const isDialogOpen = ref(false)
const stoneColor = ref()
const snackbarRef = ref(null)
const deleteLoader = ref()

const openDialog = (dialogStatus, stoneVariant) => {
  isDialogOpen.value = dialogStatus
  stoneColor.value = stoneVariant
}

defineExpose({ openDialog })

const deleteVariant = async () => {
  deleteLoader.value = true
  try {
    const response = await axios.delete(`/products/${sessionStorage.getItem('stoneID')}/delete-color/`, {
      data: {
        color_id: stoneColor.value.id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    snackbarRef.value.show('success', response.data)
    deleteLoader.value = false
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  catch (error) {
    snackbarRef.value.show('error', error.response ? error.response.data : error.message)
    deleteLoader.value = false
  }
}

const updateVariant = async () => {
  try {
    const formData = new FormData()

    formData.append('color_id', stoneColor.value.id)
    formData.append('color', JSON.stringify({
      name: stoneColor.value.name,
      is_available: true,
    }))

    const response = await axios.patch(`/products/${sessionStorage.getItem('stoneID')}/update-color/`, formData)

    snackbarRef.value.show('success', response.data)
    console.log(response)
  }
  catch (error) {
    snackbarRef.value.show('error', error.response.data)
  }
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
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
              :src="stoneColor.image"
              style="border-radius: 5px;"
            />
          </VCol>
          <VCol class="d-flex align-center">
            <VTextField
              v-model="stoneColor.name"
              label="Stone Color Name"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol class="d-flex gap-x-2">
            <VBtn
              color="error"
              variant="outline"
              :loading="deleteLoader"
              @click="deleteVariant"
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
            <VBtn @click="updateVariant">
              Save
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <SnackBar ref="snackbarRef" />
  </VDialog>
</template>
