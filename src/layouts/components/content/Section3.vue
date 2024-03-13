<script setup lang="ts">
import Loading from '../Loading.vue'
import SnackBar from '@/layouts/components/SnackBar.vue'
import SkeletonPreview from '@/layouts/components/content/SkeletonSection.vue'
import axios from '@axios'

const data = ref({
  id: '',
  heading_1: '',
  body: '',
})

const LoadingRef = ref()
const banners = ref([])
const bannerCount = ref(0)
const uploadedBanners = ref([])
const snackbarRef = ref(null)

const loading = ref(false)

const fetchData = async () => {
  const response = await axios.get('/contents/section3/')

  console.log(response.data[0])
  data.value = response.data[0]
  bannerCount.value = data.value.banner_photos.length
  uploadedBanners.value = data.value.banner_photos
  console.log(data.value)
}

const convertFileToBase64 = async file => await new Promise((resolve, reject) => {
  const reader = new FileReader()

  reader.readAsDataURL(file)
  reader.onload = () => {
    // Extracts the base64 part of the string
    const base64String = reader.result

    resolve(base64String)
  }
  reader.onerror = error => reject(error)
})

const sendData = async () => {
  loading.value = true

  const formData = new FormData()

  formData.append('body', data.value.body)
  formData.append('heading_1', data.value.heading_1)

  try {
    const response = await axios.patch(`/contents/section3/${data.value.id}/partial_update_section/`, formData, {
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

const updateBanner = async (id, count) => {
  LoadingRef.value.triggerDialog(true)
  if (!id) {
    try {
      const banner_ = await convertFileToBase64(banners.value[count][0]).then(base64 => {
        return base64
      })

      const response = await axios.patch(`https://selkirkappapi.azurewebsites.net/api/contents/section3/${data.value.id}/add_banner_photo/`, {
        photo: banner_,
      })

      snackbarRef.value.show('success', 'Upload Image Success')
      console.log(response)
      await fetchData()
    }
    catch (e) {
      snackbarRef.value.show('error', 'Upload Image Error')
      console.log(e)
    }
  }
  else {
    try {
      const banner_ = await convertFileToBase64(banners.value[count][0]).then(base64 => {
        return base64
      })

      const response = await axios.patch(`https://selkirkappapi.azurewebsites.net/api/contents/section3/${data.value.id}/update_banner_photo/`, {
        banner_photo_id: id,
        photo: banner_,
      })

      snackbarRef.value.show('success', 'Upload Image Updated')
      console.log(response)
      await fetchData()
    }
    catch (e) {
      snackbarRef.value.show('error', 'Update Image Error')
      console.log(e)
    }
  }
  LoadingRef.value.triggerDialog(false)
}

const deleteBanner = async id => {
  LoadingRef.value.triggerDialog(true)
  console.log(id)
  try {
    const response = await axios.delete(`https://selkirkappapi.azurewebsites.net/api/contents/section3/${data.value.id}/delete_banner_photo/`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        banner_photo_id: id,
      },
    })

    console.log(response)
    await fetchData()
    snackbarRef.value.show('success', 'Succesfully Deleted')
  }

  catch (e) {
    snackbarRef.value.show('error', 'Error')
    console.log(e)
  }
  LoadingRef.value.triggerDialog(false)
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
                v-model="data.body"
                label="Body"
              />
            </VCol>
            <VCol
              v-for="i in bannerCount"
              :key="i"
              cols="6"
              class="d-flex align-center "
            >
              <VFileInput
                v-model="banners[i]"
                label="Banner Photo"
                accept="image/*"
                @change="updateBanner(uploadedBanners[i - 1]?.id, i)"
              />
              <VBtn
                v-if="uploadedBanners[i - 1]?.id"
                icon="mdi-delete"
                variant="text"
                @click="deleteBanner(uploadedBanners[i - 1]?.id)"
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
    <Loading ref="LoadingRef" />
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
