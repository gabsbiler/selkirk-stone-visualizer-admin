<script setup lang="ts">
import SnackBar from '@/layouts/components/SnackBar.vue'
import SkeletonPreview from '@/layouts/components/content/SkeletonSection.vue'
import axios from '@axios'

const data = ref({
  id: '',
  heading_1: '',
  heading_2: '',
})

const banner_1 = ref()
const banner_2 = ref()
const banner_3 = ref()
const banner_4 = ref()
const banner_5 = ref()
const banner_6 = ref()

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

  if (banner_1.value)
    formData.append('banner_1', banner_1.value[0])
  if (banner_2.value)
    formData.append('banner_2', banner_2.value[0])
  if (banner_3.value)
    formData.append('banner_3', banner_3.value[0])
  if (banner_4.value)
    formData.append('banner_4', banner_4.value[0])
  if (banner_5.value)
    formData.append('banner_5', banner_5.value[0])
  if (banner_6.value)
    formData.append('banner_6', banner_6.value[0])

  try {
    const res = await axios.patch('/contents/section3/2/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    if (snackbarRef.value && res.status === 200)
      snackbarRef.value.show('success', 'Success')

    fetchData()
    loading.value = false
  }
  catch (error) {
    if (snackbarRef.value)
      snackbarRef.value.show('error', 'Please contact your administrator.')
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
            <VCol cols="6">
              <VFileInput
                v-model="banner_1"
                label="Banner Photo 1"
                accept="image/*"
              />
            </VCol>
            <VCol cols="6">
              <VFileInput
                v-model="banner_2"
                label="Banner Photo 2"
                accept="image/*"
              />
            </VCol>
            <VCol cols="6">
              <VFileInput
                v-model="banner_3"
                label="Banner Photo 3"
                accept="image/*"
              />
            </VCol>
            <VCol cols="6">
              <VFileInput
                v-model="banner_4"
                label="Banner Photo 4"
                accept="image/*"
              />
            </VCol>
            <VCol cols="6">
              <VFileInput
                v-model="banner_5"
                label="Banner Photo 5"
                accept="image/*"
              />
            </VCol>
            <VCol cols="6">
              <VFileInput
                v-model="banner_6"
                label="Banner Photo 6"
                accept="image/*"
              />
            </VCol>
          </vRow>
        </VForm>

        <div class="d-flex mt-3">
          <VSpacer />
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
