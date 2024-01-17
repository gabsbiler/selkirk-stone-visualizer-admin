<script setup lang="ts">
import SnackBar from '../SnackBar.vue'
import axios from '@axios'

const isDialogOpen = ref(false)
const addLoader = ref(false)
const snackbarRef = ref()

const formContent = ref({
  productImage: null,
  productName: null,
  isInStock: null,
  colors: [],
})

const variantColor = ref({
  variantName: null,
  variantImage: null,
})

const openDialog = () => {
  isDialogOpen.value = !isDialogOpen.value
}

defineExpose({ openDialog })

const convertToBase64 = file => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null)

      return
    }

    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
    reader.readAsDataURL(file)
  })
}

const appendColors = async () => {
  formContent.value.colors.push({
    name: variantColor.value.variantName,
    image: await convertToBase64(variantColor.value.variantImage[0]),
  })

  variantColor.value.variantImage = null
  variantColor.value.variantName = null
}

const submit = async () => {
  addLoader.value = true

  const productDetails = {
    image: await convertToBase64(formContent.value.productImage[0]),
    name: formContent.value.productName,
    status: true,
    isInStock: formContent.value.isInStock,
    colors: formContent.value.colors,
  }

  console.log(productDetails)

  try {
    const url = '/products/'
    const response = await axios.post(url, productDetails)

    console.log('Product added:', response.data)
    snackbarRef.value.show('success', response.data)
    addLoader.value = false
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  catch (error) {
    console.error('Error adding product:', error)
    snackbarRef.value.show('error', `Error adding product: ${error.response.data}`)
    addLoader.value = false
  }
}
</script>

<template>
  <VDialog
    v-model="isDialogOpen"
    class="v-dialog-sm"
  >
    <VCard title="Add Stone Product">
      <VCardText>
        <VForm>
          <VRow>
            <VCol
              cols="12"
              md="6"
            >
              <VFileInput
                v-model="formContent.productImage"
                accept="image/*"
                label="Product Image"
                :multiple="false"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="formContent.productName"
                label="Product Name"
              />
            </VCol>
            <VCol cols="12">
              <VRadioGroup
                v-model="formContent.isInStock"
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
          <hr class="my-2">
          <p class="text-body-1 my-2">
            Add Colors
          </p>
          <VRow>
            <VCol
              v-for="item in formContent.colors"
              :key="item"
              cols="12"
              md="6"
            >
              <div class="d-flex align-center gap-x-2">
                <div>
                  <VImg
                    :width="50"
                    :height="30"
                    aspect-ratio="16/9"
                    cover
                    :src="item.image"
                    style="border-radius: 5px;"
                  />
                </div>
                {{ item.name }}
              </div>
            </VCol>
          </VRow>
          <VRow class="d-flex align-center">
            <VCol
              cols="12"
              md="5"
            >
              <VFileInput
                v-model="variantColor.variantImage"
                accept="image/*"
                label="Variant Image"
              />
            </VCol>
            <VCol
              cols="12"
              md="5"
            >
              <VTextField
                v-model="variantColor.variantName"
                label="Variant Name"
              />
            </VCol>
            <VBtn
              variant="outlined"
              icon="mdi-plus"
              size="small"
              @click="appendColors"
            />
          </VRow>
          <VRow>
            <VCol>
              <VBtn
                block
                :loading="addLoader"
                variant="outlined"
                @click="submit"
              >
                Add Stone
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
    <SnackBar ref="snackbarRef" />
  </VDialog>
</template>
