<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue'
import SkeletonPreview from '@/layouts/components/content/SkeletonSection.vue'
import axios from '@axios'

const data = ref({
  id: '',
  heading_1: '',
  heading_2: '',
})

const banners = ref([])
const bannerCount = ref(0)

const snackbarRef = ref(null)

const loading = ref(false)

const fetchData = async () => {
  const response = await axios.get('/contents/section3/')

  data.value = response.data[0]
}

const sendData = async () => {
  loading.value = true

  const formData = new FormData()

  formData.append('body', data.value.heading_2)
  formData.append('heading_1', data.value.heading_1)

  // Assuming you want to upload multiple banners
  banners.value.forEach((banner, index) => {
    formData.append(`banner_photo_${index + 1}`, banner)
  })

  try {
    const response = await axios.patch(`/contents/section3/${data.value.id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (response.status === 200) {
      snackbarRef.value.show('success', 'Success')
      fetchData() // Refresh data
    }
  }
  catch (error) {
    console.error('Failed to send data', error)
    if (snackbarRef.value)
      snackbarRef.value.show('error', 'Please contact your administrator.')
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- Login -->
  <section>
    <VCard>
      <SnackBar ref="snackbarRef" />
      <VCardText
        v-if="data.id"
        class="d-flex flex-column"
      >
        <div class="d-flex justify-space-between">
          <h6 class="text-h6 text-primary mb-3">
            Landing Page (Section 3)
          </h6>
          <VCheckbox label="Show Section" />
        </div>
        <VForm>
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="data.heading_1"
                label="Heading 1"
              />
            </VCol>
            <VCol cols="12">
              <VTextarea
                v-model="data.heading_2"
                label="Heading 2"
              />
            </VCol>
            <VCol
              v-for="i in bannerCount"
              :key="i"
              cols="6"
            >
              <VFileInput
                v-model="banners[i]"
                label="Banner Photo"
                accept="image/*"
              />
            </VCol>
          </VRow>
        </VForm>

        <div class="d-flex mt-3">
          <VSpacer />

          <VBtn
            class="me-2"
            @click="bannerCount += 1"
          >
            Add Banner
          </VBtn>
          <VBtn
            :loading="loading"
            color="primary"
            @click="sendData"
          >
            Apply Changes
            <template #loader>
              <span class="custom-loader">
                <VIcon icon="bx-refresh" />
              </span>
            </template>
          </VBtn>
        </div>
      </VCardText>
      <SkeletonPreview v-else />
    </VCard>
  </section>
</template>

<style lang="scss">
.custom-loader{
  display: flex;
  animation: loader 1s infinite;
  color: white;
}

@keyframes loader {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
