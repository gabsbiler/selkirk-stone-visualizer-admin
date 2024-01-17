<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue'
import axios from '@axios'

const isDialogOpen = ref(false)

const stoneColor = ref({
  name: '',
})

const stoneImage = ref(null)
const snackbarRef = ref(null)
const addLoader = ref()

const openAddDialog = () => {
  isDialogOpen.value = !isDialogOpen.value
}

defineExpose({ openAddDialog })

const addVariant = async () => {
  addLoader.value = true
  try {
    const stoneID = sessionStorage.getItem('stoneID')
    const url = `/products/${stoneID}/add-color/`

    if (!stoneImage.value[0] || !(stoneImage.value[0] instanceof File)) {
      console.log(stoneImage)
      throw new Error('No valid image file selected')
    }

    const convertToBase64 = file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }

    const imageBase64 = await convertToBase64(stoneImage.value[0])

    const payload = {
      color: {
        name: stoneColor.value.name,
        image: imageBase64,
        is_available: true,
      },
    }

    const response = await axios.patch(url, payload)

    snackbarRef.value.show('success', response.data)
    addLoader.value = false
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  catch (error) {
    snackbarRef.value.show('error', error.message || (error.response && error.response.data))
    console.log(error.message || (error.response && error.response.data))
    addLoader.value = false
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
            <VFileInput
              v-model="stoneImage"
              label="Variant Image"
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
            <VSpacer />
            <VBtn
              variant="outlined"
              @click="isDialogOpen = false"
            >
              Cancel
            </VBtn>
            <VBtn
              :loading="addLoader"
              @click="addVariant"
            >
              Add
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <SnackBar ref="snackbarRef" />
  </VDialog>
</template>
